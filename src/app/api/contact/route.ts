import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail } from '@/lib/mailer';

const schema = z.object({
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^0[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  interest: z.string().optional(),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

type ContactData = z.infer<typeof schema>;

const INTEREST_LABELS: Record<string, string> = {
  course: 'Tư vấn khóa học đào tạo',
  corporate: 'Đào tạo doanh nghiệp (In-house)',
  mobility: 'Chương trình Mobility',
  other: 'Hợp tác & Vấn đề khác',
};

function adminHtml(data: ContactData, timestamp: string): string {
  const interest = INTEREST_LABELS[data.interest ?? ''] ?? data.interest ?? 'Chưa chọn';
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:#002D62;padding:28px 32px;">
      <h2 style="margin:0;color:#fff;font-size:20px;">📬 Liên hệ mới từ website</h2>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.7);font-size:13px;">${timestamp}</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;width:110px;">Họ tên</td>
          <td style="padding:10px 0;color:#1a1a1a;">${data.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;">Điện thoại</td>
          <td style="padding:10px 0;"><a href="tel:${data.phone}" style="color:#002D62;">${data.phone}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;">Email</td>
          <td style="padding:10px 0;"><a href="mailto:${data.email}" style="color:#002D62;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 0;color:#666;font-weight:bold;">Chủ đề</td>
          <td style="padding:10px 0;color:#1a1a1a;">${interest}</td>
        </tr>
      </table>
      <div style="margin-top:20px;background:#f4f7f9;border-left:4px solid #00A3C1;padding:16px 20px;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 6px;font-weight:bold;color:#002D62;font-size:13px;text-transform:uppercase;letter-spacing:.5px;">Nội dung</p>
        <p style="margin:0;color:#333;line-height:1.6;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
      <div style="margin-top:24px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#002D62;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Trả lời ngay</a>
      </div>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #eee;color:#999;font-size:12px;">
      Intech Global Academy — support@intechisc.com
    </div>
  </div>
</body>
</html>`;
}

function userHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:linear-gradient(135deg,#002D62,#00A3C1);padding:36px 32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:bold;">Intech Global Academy</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">Chạm tri thức, Kiến tạo tương lai</p>
    </div>
    <div style="padding:36px 32px;">
      <h2 style="margin:0 0 16px;color:#002D62;font-size:20px;">Xin chào ${data.name}! 👋</h2>
      <p style="margin:0 0 16px;color:#444;line-height:1.7;font-size:15px;">
        Cảm ơn bạn đã liên hệ với <strong>Intech Global Academy</strong>. Chúng tôi đã nhận được thông điệp của bạn và sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>.
      </p>
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px 24px;margin:24px 0;">
        <p style="margin:0 0 8px;font-weight:bold;color:#002D62;font-size:13px;">📋 Nội dung bạn đã gửi:</p>
        <p style="margin:0;color:#555;font-style:italic;line-height:1.6;">"${data.message.replace(/\n/g, '<br>')}"</p>
      </div>
      <p style="margin:0;color:#444;line-height:1.7;font-size:15px;">
        Nếu cần hỗ trợ khẩn cấp, vui lòng gọi trực tiếp: <strong>1900 xxxx</strong> hoặc email <a href="mailto:support@intechisc.com" style="color:#00A3C1;">support@intechisc.com</a>
      </p>
    </div>
    <div style="padding:20px 32px;background:#f4f7f9;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:12px;">© Intech Global Academy · TP. Hồ Chí Minh, Việt Nam</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    await Promise.all([
      sendMail({
        to: process.env.MAIL_TO!,
        subject: `[Liên hệ] ${data.name} — ${INTEREST_LABELS[data.interest ?? ''] ?? 'Chưa chọn'}`,
        html: adminHtml(data, timestamp),
        replyTo: data.email,
      }),
      sendMail({
        to: data.email,
        subject: 'Intech đã nhận yêu cầu của bạn ✅',
        html: userHtml(data),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ', details: error.issues }, { status: 400 });
    }
    console.error('[api/contact] send failed:', error);
    return NextResponse.json({ error: 'Gửi email thất bại. Vui lòng thử lại.' }, { status: 500 });
  }
}
