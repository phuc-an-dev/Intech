# PLAN — Intech Website

> **Truth source** giữa developer và Claude.
> Cập nhật file này mỗi khi một task hoàn thành hoặc quyết định thay đổi.
> Tạo: 2026-05-01 | Cập nhật lần cuối: 2026-05-01

---

## 1. QUYẾT ĐỊNH ĐÃ CHỐT

| # | Chủ đề | Quyết định |
|---|--------|------------|
| D1 | Database | **Không dùng DB** |
| D2 | Email SMTP | `mail.intechisc.com:587`, user `support@intechisc.com` |
| D3 | Email nhận đơn | `support@intechisc.com` (cùng SMTP_USER) |
| D4 | Xác nhận cho user | **Có** — gửi email confirmation về địa chỉ user điền |
| D5 | Trang cảm ơn | **Route riêng** `/[locale]/thank-you?type=contact\|registration` |
| D6 | Form validation | **`react-hook-form` + `zod`** (đã cài sẵn, chưa dùng) |
| D7 | Unused deps | Giữ nguyên `prisma`, `next-auth`, `@tanstack/react-query` — không xóa |

---

## 2. TRẠNG THÁI HIỆN TẠI

| Hạng mục | Trạng thái | Ghi chú |
|----------|-----------|---------|
| `npm run build` | ✅ PASS | 94 trang, 2 API routes mới, 0 lỗi |
| `npm test` | ✅ PASS | 25/25 tests |
| Deploy-ready | 🚧 Phase 2 chưa xong | Email + validation chưa có |

---

## 3. TASK LIST

### PHASE 0 — Unplanned fixes ✅ DONE

- [x] **T00** — Fix `next.config.ts` thiếu `createNextIntlPlugin`
  - Root cause: next-intl v4 bắt buộc wrap config với plugin — static generation bị crash
  - Fix: `import createNextIntlPlugin from 'next-intl/plugin'` + `withNextIntl(nextConfig)`

---

### PHASE 1 — Sửa lỗi (Build & Test) ✅ DONE

- [x] **T01** — Fix `@ts-expect-error` thừa trong `LanguageSwitcher.tsx`
- [x] **T02** — Thêm section "helpful links" vào `not-found.tsx`
- [x] **T03** — Thêm subscribe section vào `coming-soon/page.tsx`
- [x] **T04** — Thêm `next-intl` mock vào `src/test/setup.ts`
- [x] **T05** — Rewrite stale tests cho khớp code hiện tại

---

### PHASE 2 — Email + Trang cảm ơn + Validation ✅ DONE

- [x] **T06** — Tạo `.env.local` với SMTP config
  ```
  SMTP_HOST=mail.intechisc.com
  SMTP_PORT=587
  SMTP_USER=support@intechisc.com
  SMTP_PASS=Y6p,aA0(M9AS
  MAIL_TO=support@intechisc.com
  NEXT_PUBLIC_BASE_URL=https://intech.edu.vn
  ```

- [x] **T07** — Tạo `src/lib/mailer.ts`
  - nodemailer transporter singleton
  - `sendMail({ to, subject, html, replyTo })`

- [x] **T08** — Tạo `src/app/api/contact/route.ts`
  - POST: `{ name, phone, email, interest, message }`
  - Zod validate → gửi 2 email song song (admin + user confirmation)

- [x] **T09** — Tạo `src/app/api/registration/route.ts`
  - POST: `{ name, phone, email, school, academicYear, major, source, goal, courseTitle, topicName, levelLabel, durationHours, durationSessions, price }`
  - Zod validate → gửi 2 email song song (admin + user confirmation)

- [x] **T10** — Tạo `src/app/[locale]/thank-you/page.tsx`
  - `?type=contact` → nội dung liên hệ
  - `?type=registration` → nội dung đăng ký khóa học
  - Keys dịch thêm vào `messages/vi.json` + `messages/en.json`

- [x] **T11** — Refactor `contact/page.tsx` với react-hook-form + zod
  - Xoá `setTimeout` giả lập
  - `fetch('/api/contact')` → redirect `/thank-you?type=contact`
  - Hiển thị lỗi inline dưới mỗi field

- [x] **T12** — Refactor `RegistrationModal.tsx` với react-hook-form + zod
  - `fetch('/api/registration')` → `onClose()` + redirect `/thank-you?type=registration`
  - Hiển thị lỗi inline dưới mỗi field

---

### PHASE 3 — UX & SEO

- [ ] **T13** — Active nav link trong `Header.tsx`
  - `usePathname()` → class `text-[#00A3C1] font-bold` cho link active

- [ ] **T14** — `src/app/[locale]/courses/loading.tsx`
  - Skeleton: search bar + 6 course card (pulse animation)

- [ ] **T15** — `src/app/[locale]/error.tsx`
  - `"use client"`, props `{ error, reset }`, nút "Thử lại"

- [ ] **T16** — `src/app/robots.ts`
  - Allow all, disallow `/api/`, link sitemap

- [ ] **T17** — `generateMetadata` cho `courses/[slug]/page.tsx`
  - Title: `{courseTitle} | Intech Global Academy`
  - openGraph: title, description, locale

---

### PHASE 4 — Tests bổ sung + Dọn dẹp

- [ ] **T18** — `src/components/CourseCard.test.tsx`
- [ ] **T19** — `src/components/BackToTop.test.tsx`
- [ ] **T20** — `src/app/[locale]/thank-you/page.test.tsx`
- [ ] **T21** — Xoá 12 root-level JSON files thừa (content đã có trong `messages/`)

---

## 4. SPECS KỸ THUẬT

### Email Templates

**Admin — Contact**
```
Subject : [Liên hệ] {name} — {interest}
From    : support@intechisc.com
To      : support@intechisc.com
Reply-To: {email user}
Body    : HTML table — name, phone, email, interest, message, timestamp
```

**Admin — Registration**
```
Subject : [Đăng ký] {courseTitle} — {name}
From    : support@intechisc.com
To      : support@intechisc.com
Reply-To: {email user}
Body    : HTML 2 block — thông tin học viên + thông tin khóa học
```

**User — Contact confirmation**
```
Subject : Intech đã nhận yêu cầu của bạn
To      : {email user}
Body    : Cảm ơn {name}, phản hồi trong 24h
```

**User — Registration confirmation**
```
Subject : Xác nhận đăng ký khóa học {courseTitle}
To      : {email user}
Body    : Thông tin khóa học + bước tiếp theo (chờ tư vấn viên liên hệ)
```

### Zod Schemas

**Contact**
```ts
z.object({
  name    : z.string().min(2),
  phone   : z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})\b/),
  email   : z.email(),
  interest: z.string().optional(),
  message : z.string().min(10),
})
```

**Registration**
```ts
z.object({
  name        : z.string().min(2),
  phone       : z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})\b/),
  email       : z.email(),
  school      : z.string().min(2),
  academicYear: z.string().optional(),
  major       : z.string().optional(),
  source      : z.string().optional(),
  goal        : z.string().optional(),
})
```

### Thank You Page
```
/thank-you?type=contact      → "Cảm ơn bạn đã liên hệ!"
/thank-you?type=registration → "Đăng ký thành công!"
```

---

## 5. CHECKLIST TRƯỚC KHI DEPLOY

- [ ] `npm run build` — pass
- [ ] `npm test` — pass
- [ ] `.env.local` không commit lên git
- [ ] Gửi email test thật qua SMTP
- [ ] Trang `/thank-you?type=contact` hiển thị đúng
- [ ] Trang `/thank-you?type=registration` hiển thị đúng
- [ ] Form validation hiển thị lỗi inline đúng field
- [ ] Email đến `support@intechisc.com`
- [ ] Email confirmation đến inbox user
- [ ] Mobile menu hoạt động
- [ ] Language switcher VI/EN hoạt động
- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
