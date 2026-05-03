import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail } from '@/lib/mailer';
import { appendRow } from '@/lib/gsheets';

const schema = z.object({
  name: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^0[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  school: z.string().min(2, 'Vui lòng nhập trường/công ty'),
  academicYear: z.string().optional(),
  major: z.string().optional(),
  source: z.string().optional(),
  goal: z.string().optional(),
  courseTitle: z.string(),
  topicName: z.string(),
  levelLabel: z.string(),
  durationHours: z.number(),
  durationSessions: z.number(),
  price: z.number(),
});

type RegistrationData = z.infer<typeof schema>;

const SOURCE_LABELS: Record<string, string> = {
  facebook_ig: 'Facebook / Instagram',
  friend: 'Bạn bè giới thiệu',
  tiktok: 'TikTok',
  google: 'Google Search',
  club: 'Câu lạc bộ trường',
  other: 'Khác',
};

const YEAR_LABELS: Record<string, string> = {
  '1': 'Năm 1', '2': 'Năm 2', '3': 'Năm 3', '4': 'Năm 4',
  graduated: 'Mới tốt nghiệp', working: 'Đã đi làm',
};

function adminHtml(data: RegistrationData, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:#002D62;padding:28px 32px;">
      <h2 style="margin:0;color:#fff;font-size:20px;">Đăng ký khóa học mới</h2>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.7);font-size:13px;">${timestamp}</p>
    </div>

    <div style="padding:28px 32px;">
      <h3 style="margin:0 0 12px;color:#00A3C1;font-size:14px;text-transform:uppercase;letter-spacing:.5px;">Thông tin khóa học</h3>
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:18px;font-weight:bold;color:#002D62;">${data.courseTitle}</p>
        <table style="width:100%;font-size:14px;color:#555;">
          <tr>
            <td style="padding:3px 0;width:110px;">Chủ đề:</td><td><strong>${data.topicName}</strong></td>
            <td style="padding:3px 0;width:90px;">Cấp độ:</td><td><strong>${data.levelLabel}</strong></td>
          </tr>
          <tr>
            <td style="padding:3px 0;">Thời lượng:</td><td><strong>${data.durationHours} giờ (${data.durationSessions} buổi)</strong></td>
            <td style="padding:3px 0;">Học phí:</td><td><strong style="color:#002D62;">${data.price.toLocaleString('vi-VN')} VNĐ</strong></td>
          </tr>
        </table>
      </div>

      <h3 style="margin:0 0 12px;color:#00A3C1;font-size:14px;text-transform:uppercase;letter-spacing:.5px;">Thông tin học viên</h3>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;width:130px;">Họ tên</td>
          <td style="padding:9px 0;color:#1a1a1a;">${data.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Điện thoại</td>
          <td style="padding:9px 0;"><a href="tel:${data.phone}" style="color:#002D62;">${data.phone}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Email</td>
          <td style="padding:9px 0;"><a href="mailto:${data.email}" style="color:#002D62;">${data.email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Trường / Công ty</td>
          <td style="padding:9px 0;color:#1a1a1a;">${data.school}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Năm học</td>
          <td style="padding:9px 0;color:#1a1a1a;">${YEAR_LABELS[data.academicYear ?? ''] ?? data.academicYear ?? '—'}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Ngành học</td>
          <td style="padding:9px 0;color:#1a1a1a;">${data.major || '—'}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:9px 0;color:#666;font-weight:bold;">Nguồn biết đến</td>
          <td style="padding:9px 0;color:#1a1a1a;">${SOURCE_LABELS[data.source ?? ''] ?? data.source ?? '—'}</td>
        </tr>
      </table>
      ${data.goal ? `
      <div style="margin-top:16px;background:#f4f7f9;border-left:4px solid #00A3C1;padding:14px 18px;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 6px;font-weight:bold;color:#002D62;font-size:13px;">Mục tiêu học viên:</p>
        <p style="margin:0;color:#333;line-height:1.6;">${data.goal}</p>
      </div>` : ''}
      <div style="margin-top:24px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#002D62;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Liên hệ học viên</a>
      </div>
    </div>
    <div style="padding:16px 32px;border-top:1px solid #eee;color:#999;font-size:12px;">
      Intech Global Academy — support@intechisc.com
    </div>
  </div>
</body>
</html>`;
}

function userHtml(data: RegistrationData): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="margin:0;padding:0;background:#f4f7f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:linear-gradient(135deg,#002D62,#00A3C1);padding:36px 32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:bold;">Intech Global Academy</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">Kiến tạo nhân lực công nghiệp tương lai</p>
    </div>
    <div style="padding:36px 32px;">
      <h2 style="margin:0 0 16px;color:#002D62;font-size:20px;">Xin chào ${data.name}!</h2>
      <p style="margin:0 0 20px;color:#444;line-height:1.7;font-size:15px;">
        Bạn đã đăng ký thành công! Bộ phận tuyển sinh Intech sẽ liên hệ với bạn qua số điện thoại <strong>${data.phone}</strong> trong thời gian sớm nhất để tư vấn chi tiết.
      </p>

      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-weight:bold;color:#002D62;">Khóa học đã đăng ký:</p>
        <p style="margin:0 0 6px;font-size:18px;font-weight:bold;color:#1a1a1a;">${data.courseTitle}</p>
        <p style="margin:0;font-size:14px;color:#666;">${data.topicName} · ${data.levelLabel} · ${data.durationHours} giờ (${data.durationSessions} buổi)</p>
        <p style="margin:8px 0 0;font-size:16px;font-weight:bold;color:#002D62;">${data.price.toLocaleString('vi-VN')} VNĐ</p>
      </div>

      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:20px 24px;margin-bottom:16px;">
        <p style="margin:0 0 12px;font-weight:bold;color:#c2410c;font-size:13px;">Hướng dẫn thanh toán học phí:</p>
        <table style="width:100%;font-size:14px;color:#444;border-collapse:collapse;">
          <tr><td style="padding:4px 0;width:140px;color:#666;">Ngân hàng:</td><td style="font-weight:bold;">[TÊN NGÂN HÀNG]</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Số tài khoản:</td><td style="font-weight:bold;">[SỐ TÀI KHOẢN]</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Chủ tài khoản:</td><td style="font-weight:bold;">[CHỦ TÀI KHOẢN]</td></tr>
          <tr><td style="padding:4px 0;color:#666;">Số tiền:</td><td style="font-weight:bold;color:#002D62;">${data.price.toLocaleString('vi-VN')} VNĐ</td></tr>
        </table>
        <div style="margin-top:12px;background:#fef3c7;border-radius:8px;padding:12px 16px;">
          <p style="margin:0 0 4px;font-weight:bold;color:#92400e;font-size:13px;">Nội dung chuyển khoản:</p>
          <p style="margin:0;font-size:16px;font-weight:bold;color:#1a1a1a;letter-spacing:.5px;">INTECH ${data.name.toUpperCase().replace(/\s+/g, '')} ${data.phone.slice(-4)}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#666;">Ví dụ: INTECH NGUYENVANA 7890</p>
        </div>
        <p style="margin:12px 0 0;font-size:13px;color:#c2410c;">Vui lòng chuyển khoản trong vòng <strong>3 ngày làm việc</strong>.</p>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;">
        <p style="margin:0 0 8px;font-weight:bold;color:#166534;font-size:13px;">Bước tiếp theo:</p>
        <ol style="margin:0;padding-left:20px;color:#555;line-height:1.8;font-size:14px;">
          <li>Chuyển khoản học phí theo thông tin trên</li>
          <li>Tư vấn viên xác nhận và gửi tài liệu chuẩn bị</li>
          <li>Tham gia lớp học đúng lịch khai giảng</li>
        </ol>
      </div>
    </div>
    <div style="padding:20px 32px;background:#f4f7f9;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0 0 4px;color:#555;font-size:13px;">Mọi thắc mắc vui lòng liên hệ: <a href="mailto:support@intechisc.com" style="color:#00A3C1;">support@intechisc.com</a></p>
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

    const sourceLabel = SOURCE_LABELS[data.source ?? ''] ?? data.source ?? ''
    const yearLabel = YEAR_LABELS[data.academicYear ?? ''] ?? data.academicYear ?? ''

    const [adminResult, userResult, sheetResult] = await Promise.allSettled([
      sendMail({
        to: process.env.MAIL_TO!,
        subject: `[Đăng ký] ${data.courseTitle} — ${data.name}`,
        html: adminHtml(data, timestamp),
        replyTo: data.email,
      }),
      sendMail({
        to: data.email,
        subject: `Xác nhận đăng ký: ${data.courseTitle}`,
        html: userHtml(data),
      }),
      appendRow('registrations', [
        timestamp, data.name, data.phone, data.email,
        data.school, yearLabel, data.major ?? '', sourceLabel, data.goal ?? '',
        data.courseTitle, data.topicName, data.levelLabel,
        data.durationHours, data.durationSessions, data.price,
        'Chờ thanh toán',
      ]),
    ]);

    if (adminResult.status === 'rejected') {
      console.error('[api/registration] admin mail failed:', adminResult.reason);
    }
    if (userResult.status === 'rejected') {
      console.error('[api/registration] user mail failed:', userResult.reason);
      return NextResponse.json({ error: 'Gửi email thất bại. Vui lòng thử lại.' }, { status: 500 });
    }
    if (sheetResult.status === 'rejected') {
      console.error('[api/registration] sheet write failed:', sheetResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ', details: error.issues }, { status: 400 });
    }
    console.error('[api/registration] failed:', error);
    return NextResponse.json({ error: 'Gửi email thất bại. Vui lòng thử lại.' }, { status: 500 });
  }
}
