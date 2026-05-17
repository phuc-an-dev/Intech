# Kế Hoạch Implement Thumbnail Khóa Học

> **Cho agent thực thi:** BẮT BUỘC DÙNG SUB-SKILL: dùng `superpowers:subagent-driven-development` (khuyến nghị) hoặc `superpowers:executing-plans` để implement plan này theo từng task. Các bước dùng checklist (`- [ ]`) để tiện theo dõi.

**Rule theo preference của user:** Khi viết plan/tài liệu cho user này, ưu tiên viết bằng **tiếng Việt**, giữ nguyên tên file, tên biến, câu lệnh và thuật ngữ kỹ thuật cần chính xác bằng tiếng Anh.

**Mục tiêu:** Đưa 35 ảnh thumbnail course vào hệ thống theo hướng clean và bền vững: ảnh dùng WebP, tên file theo slug course, runtime code không chứa hard-code map ảnh.

**Kiến trúc:** Dùng `slug` từ Google Sheet làm khóa canonical cho asset. 35 ảnh nguồn trong `tmp_docs/thumbnail 35 môn học` chỉ là input migration; script sẽ convert/rename thành `public/images/courses/course-{slug}.webp`. Runtime chỉ đọc `course.imageUrl`; nếu sheet chưa có `image_url`, `src/lib/courses.ts` tự fallback về `/images/courses/course-{slug}.webp`. Mapping title -> slug chỉ được phép tồn tại trong migration script, không tồn tại trong component/app runtime.

**Tech Stack:** Next.js App Router, TypeScript, React, `next/image`, Google Sheet CSV data source, `sharp` để convert ảnh, Vitest/Testing Library.

---

## Kết Luận Audit Ảnh Hiện Tại

- Thư mục nguồn: `tmp_docs/thumbnail 35 môn học`
- Số lượng ảnh nguồn: 35 file
- Định dạng ảnh nguồn: PNG
- Kích thước ảnh nguồn: tất cả đều `800 x 450`, đúng tỉ lệ 16:9.
- Google Sheet hiện có 35 course `published`.
- Dự án hiện có 35 ảnh course cũ dạng JPG ở `public/images/course-{slug}.jpg`.
- Trang detail course đang dùng `course.imageUrl`.
- Trang card course đang **không** dùng `course.imageUrl`; `src/components/CourseCard.tsx` có `getCoverImage(slug)` map hard-code 35 slug sang JPG.
- `next.config.ts` đã bật `images.formats = ['image/avif', 'image/webp']`.
- Dự án đã dùng WebP ở nhiều nơi: tour, hero, consultant, OG.
- `scripts/fetch-course-images.py` có hàm `convert_to_webp()` bằng `sips`, nhưng flow chính hiện không gọi hàm này.
- `scripts/import-course-details.mjs` đang set `image_url` thành `/images/courses/${slug}.jpg`; nếu còn dùng script này, cần sửa sang `.webp`.

## Best Practice Chốt

- Runtime không được giữ map ảnh theo slug trong component.
- `slug` là source of truth.
- File ảnh course chuẩn dùng naming convention:

```text
public/images/courses/course-{slug}.webp
```

- `image_url` trên Google Sheet là override tùy chọn. Nếu sheet trống, app tự fallback về file WebP canonical theo slug.
- Mapping title file nguồn -> slug chỉ là migration concern, vì source assets hiện đang đặt tên bằng course title. Sau khi convert xong, app không phụ thuộc mapping này nữa.
- Nên dùng WebP thay vì PNG cho thumbnail vì ảnh course là raster web thumbnail 800x450, WebP nhẹ hơn và phù hợp pattern hiện có của dự án.

## Cấu Trúc File

- Tạo: `scripts/install-course-thumbnails.mjs`
  - Convert/rename 35 PNG nguồn sang WebP canonical bằng `sharp`.
  - Có explicit title-to-slug map do source folder đang đặt tên bằng title.
  - Script fail nếu thiếu/thừa file nguồn hoặc output không đủ 35 ảnh.
- Sửa: `src/lib/courses.ts`
  - Đổi fallback image path sang `/images/courses/course-${slug}.webp`.
  - Chuẩn hóa các giá trị `image_url` legacy dạng JPG trong Google Sheet sang WebP canonical ở runtime.
- Sửa: `src/components/CourseCard.tsx`
  - Xóa `getCoverImage`.
  - Dùng `course.imageUrl`.
- Sửa: `src/components/CourseImage.tsx`
  - Chuyển từ `<img>` sang `next/image` để detail page đi cùng optimization path với card.
  - Giữ fallback UI khi ảnh lỗi.
- Sửa: `src/components/CourseCard.test.tsx`
  - Test card dùng `course.imageUrl`.
- Sửa: `scripts/import-course-details.mjs`
  - Đổi dòng set sheet `image_url` từ `.jpg` sang `.webp` để script không ghi URL sai trong tương lai.
- Sửa: `scripts/fetch-course-images.py`
  - Nếu còn dùng script Unsplash cũ, output cũng phải là `public/images/courses/course-{slug}.webp`.
- Sửa: `package.json`, `package-lock.json`
  - Khai báo `sharp` trực tiếp trong `devDependencies` để script convert không phụ thuộc vào transitive dependency của Next.

## Mapping Migration Một Lần

Mapping này chỉ nằm trong `scripts/install-course-thumbnails.mjs`. Không đưa nó vào `CourseCard`, `CourseImage`, `src/lib/courses.ts` hoặc bất kỳ runtime module nào.

```js
const IMAGE_MAP = {
  "Basic Prompt Engineering.png": "basic-prompt-engineering",
  "AI-Driven Data Analysis.png": "ai-driven-data-analysis",
  "GenAI in Supply Chain Planning.png": "genai-in-scm-planning",
  "Low-code AI Agent Design.png": "low-code-ai-agent-design",
  "AI Strategic Leadership.png": "ai-strategic-leadership",
  "Lean Thinking 4.0.png": "lean-thinking-4",
  "Six Sigma Green Belt.png": "six-sigma-green-belt",
  "Applied SPC.png": "applied-spc",
  "DoE for Process Optimization.png": "doe-process-optimization",
  "Quality 4.0 Strategy.png": "quality-4-strategy",
  "Inventory Masterclass.png": "inventory-masterclass",
  "Routing & Fleet Ops.png": "routing-fleet-ops",
  "Warehouse Flow Design.png": "warehouse-flow-design",
  "Supply Chain Network Design.png": "supply-chain-network-design",
  "Simulation & Decision Support.png": "simulation-decision-support",
  "Logistics Dashboarding.png": "logistics-dashboarding",
  "SQL for Supply Chain.png": "sql-for-supply-chain",
  "Advanced Demand Planning.png": "advanced-demand-planning",
  "Digital Twin Foundation.png": "digital-twin-foundation",
  "Digital Transformation Roadmap.png": "digital-transformation-roadmap",
  "Customs & Trade Practice.png": "customs-trade-practice",
  "Operations Standards (ISO).png": "operations-standards-iso",
  "FTA & Rules of Origin Master.png": "fta-rules-of-origin-master",
  "Legal Risk in Logistics.png": "legal-risk-in-logistics",
  "Integrity & Digital Compliance.png": "integrity-digital-compliance",
  "Industrial IoT & Sensors.png": "industrial-iot-sensors",
  "Computer Vision in Ops.png": "computer-vision-in-ops",
  "Real-time Monitoring Systems.png": "realtime-monitoring-systems",
  "Predictive Maintenance (AIoT).png": "predictive-maintenance-aiot",
  "AIoT Strategic Roadmap.png": "aiot-strategic-roadmap",
  "Technical Presentation Excellence.png": "technical-presentation-excellence",
  "Structural Problem Solving.png": "structural-problem-solving",
  "Project Execution for Engineers.png": "project-execution-for-engineers",
  "Operational Leadership.png": "operational-leadership",
  "Supply Chain Executive Path.png": "supply-chain-executive-path",
}
```

## Tasks

### Task 1: Tạo Script Convert Thumbnail Sang WebP

**Files:**
- Tạo: `scripts/install-course-thumbnails.mjs`
- Sửa: `package.json`
- Sửa: `package-lock.json`
- Input: `tmp_docs/thumbnail 35 môn học/*.png`
- Output: `public/images/courses/course-{slug}.webp`

- [ ] **Step 1: Khai báo `sharp` trực tiếp**

Chạy:

```bash
npm install --save-dev sharp@0.34.5
```

Kết quả mong đợi:

```text
sharp@0.34.5
```

- [ ] **Step 2: Tạo script convert/rename**

Tạo file `scripts/install-course-thumbnails.mjs`:

```js
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const ROOT = path.resolve(path.dirname(__filename), "..")
const SOURCE_DIR = path.join(ROOT, "tmp_docs", "thumbnail 35 môn học")
const OUTPUT_DIR = path.join(ROOT, "public", "images", "courses")

const IMAGE_MAP = {
  "Basic Prompt Engineering.png": "basic-prompt-engineering",
  "AI-Driven Data Analysis.png": "ai-driven-data-analysis",
  "GenAI in Supply Chain Planning.png": "genai-in-scm-planning",
  "Low-code AI Agent Design.png": "low-code-ai-agent-design",
  "AI Strategic Leadership.png": "ai-strategic-leadership",
  "Lean Thinking 4.0.png": "lean-thinking-4",
  "Six Sigma Green Belt.png": "six-sigma-green-belt",
  "Applied SPC.png": "applied-spc",
  "DoE for Process Optimization.png": "doe-process-optimization",
  "Quality 4.0 Strategy.png": "quality-4-strategy",
  "Inventory Masterclass.png": "inventory-masterclass",
  "Routing & Fleet Ops.png": "routing-fleet-ops",
  "Warehouse Flow Design.png": "warehouse-flow-design",
  "Supply Chain Network Design.png": "supply-chain-network-design",
  "Simulation & Decision Support.png": "simulation-decision-support",
  "Logistics Dashboarding.png": "logistics-dashboarding",
  "SQL for Supply Chain.png": "sql-for-supply-chain",
  "Advanced Demand Planning.png": "advanced-demand-planning",
  "Digital Twin Foundation.png": "digital-twin-foundation",
  "Digital Transformation Roadmap.png": "digital-transformation-roadmap",
  "Customs & Trade Practice.png": "customs-trade-practice",
  "Operations Standards (ISO).png": "operations-standards-iso",
  "FTA & Rules of Origin Master.png": "fta-rules-of-origin-master",
  "Legal Risk in Logistics.png": "legal-risk-in-logistics",
  "Integrity & Digital Compliance.png": "integrity-digital-compliance",
  "Industrial IoT & Sensors.png": "industrial-iot-sensors",
  "Computer Vision in Ops.png": "computer-vision-in-ops",
  "Real-time Monitoring Systems.png": "realtime-monitoring-systems",
  "Predictive Maintenance (AIoT).png": "predictive-maintenance-aiot",
  "AIoT Strategic Roadmap.png": "aiot-strategic-roadmap",
  "Technical Presentation Excellence.png": "technical-presentation-excellence",
  "Structural Problem Solving.png": "structural-problem-solving",
  "Project Execution for Engineers.png": "project-execution-for-engineers",
  "Operational Leadership.png": "operational-leadership",
  "Supply Chain Executive Path.png": "supply-chain-executive-path",
}

function assertSourceFiles() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`)
  }

  const sourceFiles = fs.readdirSync(SOURCE_DIR).filter((name) => name.endsWith(".png"))
  const expectedFiles = Object.keys(IMAGE_MAP)
  const missing = expectedFiles.filter((name) => !sourceFiles.includes(name))
  const unexpected = sourceFiles.filter((name) => !expectedFiles.includes(name))

  if (missing.length || unexpected.length) {
    console.error({ missing, unexpected })
    throw new Error("Thumbnail source files do not match IMAGE_MAP")
  }
}

async function convertToWebp(source, dest) {
  await sharp(source)
    .webp({ quality: 82 })
    .toFile(dest)
}

assertSourceFiles()
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

for (const [filename, slug] of Object.entries(IMAGE_MAP)) {
  const source = path.join(SOURCE_DIR, filename)
  const dest = path.join(OUTPUT_DIR, `course-${slug}.webp`)
  await convertToWebp(source, dest)

  console.log(`${filename} -> ${path.relative(ROOT, dest)}`)
}

const outputs = fs.readdirSync(OUTPUT_DIR).filter((name) => /^course-.+\.webp$/.test(name))
if (outputs.length !== Object.keys(IMAGE_MAP).length) {
  throw new Error(`Expected 35 course webp files, found ${outputs.length}`)
}

console.log(`Installed ${outputs.length} course thumbnails.`)
```

- [ ] **Step 3: Chạy script**

Chạy:

```bash
node scripts/install-course-thumbnails.mjs
```

Kết quả mong đợi:

```text
Installed 35 course thumbnails.
```

- [ ] **Step 4: Verify output**

Chạy:

```bash
find public/images/courses -maxdepth 1 -type f -name 'course-*.webp' | wc -l
find public/images/courses -maxdepth 1 -type f -name 'course-*.webp' -print0 | xargs -0 file | rg 'Web/P image|RIFF' | wc -l
```

Kết quả mong đợi:

```text
35
35
```

- [ ] **Step 5: Commit asset pipeline**

```bash
git add package.json package-lock.json scripts/install-course-thumbnails.mjs public/images/courses
git commit -m "chore: install course thumbnails as webp"
```

### Task 2: Đổi Course Data Fallback Sang WebP Canonical

**Files:**
- Sửa: `src/lib/courses.ts`
- Sửa: `scripts/import-course-details.mjs`
- Sửa: `scripts/fetch-course-images.py`

- [ ] **Step 1: Sửa fallback trong `src/lib/courses.ts`**

Thêm helper:

```ts
function courseImageUrl(row: Record<string, string>): string {
  const slug = row.slug?.trim()
  const canonical = `/images/courses/course-${slug}.webp`
  const imageUrl = row.image_url?.trim()

  if (!imageUrl) return canonical
  if (/^\/images\/courses\/[^/]+\.jpg$/i.test(imageUrl)) return canonical
  if (/^\/images\/course-[^/]+\.jpg$/i.test(imageUrl)) return canonical

  return imageUrl
}
```

Rồi thay:

```ts
imageUrl: r.image_url?.trim() || `/images/course-${r.slug?.trim()}.jpg`,
```

bằng:

```ts
imageUrl: courseImageUrl(r),
```

- [ ] **Step 2: Sửa script import sheet để không ghi URL JPG sai**

Trong `scripts/import-course-details.mjs`, thay:

```js
row[newIdx['image_url']] = `/images/courses/${slug}.jpg`
```

bằng:

```js
row[newIdx['image_url']] = `/images/courses/course-${slug}.webp`
```

- [ ] **Step 3: Sửa script Unsplash cũ để output WebP canonical**

Trong `scripts/fetch-course-images.py`, đảm bảo:

```py
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/courses")
```

Script chỉ lưu WebP:

```py
dest_webp = os.path.join(OUT_DIR, f"course-{slug}.webp")
```

Và map in ra dùng:

```py
print(f'    "{slug}": "/images/courses/course-{slug}.webp",')
```

- [ ] **Step 4: Commit data fallback**

```bash
git add src/lib/courses.ts scripts/import-course-details.mjs scripts/fetch-course-images.py
git commit -m "feat: use canonical webp course image urls"
```

### Task 3: Cho Course Card Dùng `course.imageUrl`

**Files:**
- Sửa: `src/components/CourseCard.tsx`
- Sửa: `src/components/CourseCard.test.tsx`

- [ ] **Step 1: Xóa runtime hard-code map**

Trong `src/components/CourseCard.tsx`, xóa toàn bộ hàm:

```ts
const getCoverImage = (slug: string): string | null => {
  const images: Record<string, string> = {
    // 35 hard-coded paths
  };
  return images[slug] ?? null;
};
```

- [ ] **Step 2: Dùng `course.imageUrl`**

Thay:

```ts
const coverImage = getCoverImage(course.slug);
```

bằng:

```ts
const coverImage = course.imageUrl;
```

- [ ] **Step 3: Giữ fallback gradient**

Giữ nguyên branch fallback gradient hiện tại khi `coverImage` rỗng. Không thêm mapping khác vào component.

- [ ] **Step 4: Cập nhật test**

Trong `src/components/CourseCard.test.tsx`, đảm bảo mock course có:

```ts
imageUrl: "/images/courses/course-test-course-slug.webp",
```

Thêm test:

```ts
it("uses the imageUrl supplied by course data", () => {
  render(<CourseCard course={mockCourse} />)

  const image = screen.getByAltText("Test Course")
  expect(image).toHaveAttribute("src", expect.stringContaining("course-test-course-slug.webp"))
})
```

- [ ] **Step 5: Chạy test CourseCard**

```bash
npm test -- CourseCard
```

Kết quả mong đợi: PASS.

- [ ] **Step 6: Commit card cleanup**

```bash
git add src/components/CourseCard.tsx src/components/CourseCard.test.tsx
git commit -m "feat: render course cards from imageUrl"
```

### Task 4: Tối Ưu Course Detail Image Với `next/image`

**Files:**
- Sửa: `src/components/CourseImage.tsx`

- [ ] **Step 1: Sửa component dùng `next/image`**

Thay nội dung `src/components/CourseImage.tsx` bằng:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";

interface CourseImageProps {
  src: string;
  alt: string;
  title: string;
}

export default function CourseImage({ src, alt, title }: CourseImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <BookOpen className="w-16 h-16 opacity-30" />
        <span className="text-sm font-medium">{title}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 1024px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
```

- [ ] **Step 2: Kiểm tra parent đã có `relative`**

Trong `src/app/[locale]/courses/[slug]/page.tsx`, parent của `CourseImage` hiện là:

```tsx
<div className="w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm flex items-center justify-center">
```

Đổi thành:

```tsx
<div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm flex items-center justify-center">
```

- [ ] **Step 3: Commit detail image optimization**

```bash
git add src/components/CourseImage.tsx 'src/app/[locale]/courses/[slug]/page.tsx'
git commit -m "feat: optimize course detail images"
```

### Task 5: Verify Đủ 35 WebP Theo Slug

**Files:**
- Chỉ verify

- [ ] **Step 1: Kiểm tra mọi slug published đều có WebP**

```bash
node - <<'NODE'
const fs = require("fs")
const slugs = [
  "basic-prompt-engineering",
  "ai-driven-data-analysis",
  "genai-in-scm-planning",
  "low-code-ai-agent-design",
  "ai-strategic-leadership",
  "lean-thinking-4",
  "six-sigma-green-belt",
  "applied-spc",
  "doe-process-optimization",
  "quality-4-strategy",
  "inventory-masterclass",
  "routing-fleet-ops",
  "warehouse-flow-design",
  "supply-chain-network-design",
  "simulation-decision-support",
  "logistics-dashboarding",
  "sql-for-supply-chain",
  "advanced-demand-planning",
  "digital-twin-foundation",
  "digital-transformation-roadmap",
  "customs-trade-practice",
  "operations-standards-iso",
  "fta-rules-of-origin-master",
  "legal-risk-in-logistics",
  "integrity-digital-compliance",
  "industrial-iot-sensors",
  "computer-vision-in-ops",
  "realtime-monitoring-systems",
  "predictive-maintenance-aiot",
  "aiot-strategic-roadmap",
  "technical-presentation-excellence",
  "structural-problem-solving",
  "project-execution-for-engineers",
  "operational-leadership",
  "supply-chain-executive-path",
]

const missing = slugs.filter((slug) => !fs.existsSync(`public/images/courses/course-${slug}.webp`))
if (missing.length) {
  console.error("Missing thumbnails:", missing)
  process.exit(1)
}
console.log(`All ${slugs.length} WebP thumbnails exist.`)
NODE
```

Kết quả mong đợi:

```text
All 35 WebP thumbnails exist.
```

- [ ] **Step 2: Kiểm tra runtime không còn map ảnh course**

```bash
rg -n "getCoverImage|/images/courses/[^'\\\"]+\\.jpg|/images/course-" src/components scripts
```

Kết quả mong đợi:

```text
```

Không có output trong component runtime hoặc script asset cũ. `src/lib/courses.ts` được phép có regex nhận diện URL JPG legacy để normalize sang WebP canonical.

- [ ] **Step 3: Chạy test, lint, build**

```bash
npm test
npm run lint
npm run build
```

Kết quả mong đợi: tất cả PASS.

### Task 6: Browser Verification

**Files:**
- Chỉ verify

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Kết quả mong đợi: app chạy ở localhost URL được in ra terminal.

- [ ] **Step 2: Verify trang danh sách**

Mở:

```text
http://localhost:3000/vi/courses
```

Kết quả mong đợi:

- Card course hiển thị ảnh thật từ `course.imageUrl`.
- Không có card nào fallback về gradient chữ cái.
- Không có ảnh course JPG cũ trong network request.

- [ ] **Step 3: Verify trang detail đại diện**

Mở:

```text
http://localhost:3000/vi/courses/basic-prompt-engineering
http://localhost:3000/vi/courses/doe-process-optimization
http://localhost:3000/vi/courses/customs-trade-practice
http://localhost:3000/vi/courses/realtime-monitoring-systems
http://localhost:3000/vi/courses/supply-chain-executive-path
```

Kết quả mong đợi:

- Detail image render đúng.
- Không có request ảnh 404.
- Ảnh giữ tỉ lệ 16:9, không bị méo.
- Network request dùng asset canonical `/images/courses/course-{slug}.webp` hoặc route optimized của Next Image.

## Tự Review Plan

- Coverage: Plan đã bao phủ migration 35 PNG nguồn sang WebP, sửa fallback course data, xóa runtime map trong card, tối ưu detail image, sửa script import sheet để không ghi URL JPG sai, và verify browser.
- Placeholder scan: Không có placeholder chưa xử lý.
- Type consistency: Plan dùng lại `LocalizedCourse.imageUrl`, không thêm type mới.
- Best practice check: Mapping chỉ tồn tại trong migration script, runtime dùng slug convention và `course.imageUrl`.

## Lựa Chọn Thực Thi

Plan đã hoàn tất và lưu ở `docs/superpowers/plans/2026-05-17-course-thumbnails.md`.

1. **Subagent-Driven (khuyến nghị)** - dispatch một subagent mới cho từng task, review giữa các task, iterate nhanh.
2. **Inline Execution** - thực thi ngay trong session này bằng `executing-plans`, làm theo batch có checkpoint.
