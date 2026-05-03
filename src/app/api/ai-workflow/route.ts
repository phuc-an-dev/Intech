import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendMail } from '@/lib/mailer'
import { appendRow } from '@/lib/gsheets'

const schema = z.object({
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^0[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
})

type WorkflowData = z.infer<typeof schema>

function adminHtml(data: WorkflowData, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:#002D62;padding:28px 32px;">
      <h2 style="margin:0;color:#fff;font-size:20px;">🤖 Đăng ký Workshop AI mới</h2>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.7);font-size:13px;">${timestamp}</p>
    </div>
    <div style="padding:28px 32px;">
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
        <p style="margin:0;font-weight:bold;color:#002D62;">Workshop Miễn Phí — AI-Powered Workflow</p>
        <p style="margin:4px 0 0;font-size:13px;color:#555;">Khai giảng: 15/06/2026 · Online</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;width:110px;">Họ tên</td>
          <td style="padding:10px 0;color:#1a1a1a;">${data.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;">Điện thoại</td>
          <td style="padding:10px 0;"><a href="tel:${data.phone}" style="color:#002D62;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#666;font-weight:bold;">Email</td>
          <td style="padding:10px 0;"><a href="mailto:${data.email}" style="color:#002D62;">${data.email}</a></td>
        </tr>
      </table>
      <div style="margin-top:24px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#002D62;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Liên hệ học viên</a>
      </div>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #eee;color:#999;font-size:12px;">
      Intech Global Academy — support@intechisc.com
    </div>
  </div>
</body>
</html>`
}

function userHtml(data: WorkflowData): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:linear-gradient(135deg,#002D62,#00A3C1);padding:36px 32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:bold;">Intech Global Academy</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">AI-Powered Workflow Workshop</p>
    </div>
    <div style="padding:36px 32px;">
      <h2 style="margin:0 0 16px;color:#002D62;font-size:20px;">Xin chào ${data.name}! 🎉</h2>
      <p style="margin:0 0 20px;color:#444;line-height:1.7;font-size:15px;">
        Bạn đã đăng ký thành công <strong>Workshop Miễn Phí — AI-Powered Workflow</strong>. Chúng tôi sẽ gửi thông tin chi tiết và link tham gia trước ngày khai giảng.
      </p>

      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-weight:bold;color:#002D62;">🤖 Thông tin Workshop:</p>
        <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#1a1a1a;">Workshop Miễn Phí — AI-Powered Workflow</p>
        <p style="margin:0 0 6px;font-size:14px;color:#555;">Tối ưu hóa hiệu suất công việc với kỹ thuật Prompting đỉnh cao và quy trình tự động hóa bằng AI chỉ trong 03 buổi.</p>
        <ul style="margin:12px 0 0;padding-left:20px;color:#444;line-height:1.8;font-size:14px;">
          <li>Làm chủ ChatGPT, Gemini &amp; Claude cho công việc</li>
          <li>Tự động hóa báo cáo và xử lý dữ liệu</li>
          <li>📅 Khai giảng: 15/06/2026 · Hình thức: Online</li>
        </ul>
      </div>

      <p style="margin:0;color:#444;line-height:1.7;font-size:15px;">
        Mọi thắc mắc vui lòng liên hệ: <a href="mailto:support@intechisc.com" style="color:#00A3C1;">support@intechisc.com</a>
      </p>
    </div>
    <div style="padding:20px 32px;background:#f4f7f9;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:12px;">© Intech Global Academy · TP. Hồ Chí Minh, Việt Nam</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })

    const [adminResult, userResult, sheetResult] = await Promise.allSettled([
      sendMail({
        to: process.env.MAIL_TO!,
        subject: `[Workshop AI] Đăng ký mới — ${data.name}`,
        html: adminHtml(data, timestamp),
        replyTo: data.email,
      }),
      sendMail({
        to: data.email,
        subject: 'Đăng ký Workshop AI-Powered Workflow thành công! 🎉',
        html: userHtml(data),
      }),
      appendRow('ai_workflow', [timestamp, data.name, data.phone, data.email, 'Waitlist']),
    ])

    if (adminResult.status === 'rejected' || userResult.status === 'rejected') {
      console.error('[api/ai-workflow] mail failed:', adminResult, userResult)
      return NextResponse.json({ error: 'Gửi email thất bại. Vui lòng thử lại.' }, { status: 500 })
    }
    if (sheetResult.status === 'rejected') {
      console.error('[api/ai-workflow] sheet write failed:', sheetResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ', details: error.issues }, { status: 400 })
    }
    console.error('[api/ai-workflow]', error)
    return NextResponse.json({ error: 'Đã có lỗi xảy ra. Vui lòng thử lại.' }, { status: 500 })
  }
}
