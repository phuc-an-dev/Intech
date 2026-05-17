// scripts/import-course-details.mjs
// Run from project root: node scripts/import-course-details.mjs
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── Auth ──────────────────────────────────────────────────────────────────

function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  }
  const keyPath = path.join(ROOT, 'intech-495204-5bfbb0689257.json')
  return JSON.parse(fs.readFileSync(keyPath, 'utf-8'))
}

function base64url(buf) {
  const b = typeof buf === 'string' ? Buffer.from(buf) : buf
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function getAccessToken() {
  const sa = loadServiceAccount()
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }))
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(`${header}.${payload}`)
  const sig = base64url(sign.sign(sa.private_key))
  const jwt = `${header}.${payload}.${sig}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(`OAuth failed: ${JSON.stringify(data)}`)
  return data.access_token
}

// ── Sheets API ─────────────────────────────────────────────────────────────

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1zIyIt9vZOVUXG05HbRap3rgGmuKDkz0rjaiSesk1CGM'
const COURSES_GID = process.env.GOOGLE_SHEET_COURSES_GID || '967114232'

async function getTabName(token) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`spreadsheets.get failed (${res.status}): ${await res.text()}`)
  const data = await res.json()
  const sheet = data.sheets?.find(s => String(s.properties?.sheetId) === COURSES_GID)
  if (!sheet) {
    // Fallback: use first sheet
    console.warn(`  ⚠ GID ${COURSES_GID} not found, using first sheet`)
    return data.sheets?.[0]?.properties?.title || 'Sheet1'
  }
  return sheet.properties.title
}

async function sheetsGet(token, range) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`GET ${range} failed (${res.status}): ${await res.text()}`)
  return res.json()
}

async function sheetsClear(token, range) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:clear`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`clear failed (${res.status}): ${await res.text()}`)
}

async function sheetsBatchUpdate(token, rangeData) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'USER_ENTERED', data: rangeData }),
    }
  )
  if (!res.ok) throw new Error(`batchUpdate failed (${res.status}): ${await res.text()}`)
  return res.json()
}

// ── MD Parser ──────────────────────────────────────────────────────────────

const SLUG_MAP = {
  'Basic Prompt Engineering': 'basic-prompt-engineering',
  'AI-Driven Data Analysis': 'ai-driven-data-analysis',
  'GenAI in Supply Chain Planning': 'genai-in-scm-planning',
  'Low-code AI Agent Design': 'low-code-ai-agent-design',
  'AI Strategic Leadership & Governance': 'ai-strategic-leadership',
  'Lean Thinking 4.0': 'lean-thinking-4',
  'Six Sigma Green Belt': 'six-sigma-green-belt',
  'Applied SPC': 'applied-spc',
  'Design of Experiment for Process Optimization': 'doe-process-optimization',
  'Quality 4.0 Strategy': 'quality-4-strategy',
  'Inventory Masterclass': 'inventory-masterclass',
  'Routing & Fleet Ops': 'routing-fleet-ops',
  'Warehouse Flow Design': 'warehouse-flow-design',
  'Supply Chain Network Design': 'supply-chain-network-design',
  'Simulation & Decision Support': 'simulation-decision-support',
  'Logistics Dashboarding': 'logistics-dashboarding',
  'SQL for Supply Chain': 'sql-for-supply-chain',
  'Advanced Demand Forecasting': 'advanced-demand-planning',
  'Digital Twin Foundation': 'digital-twin-foundation',
  'Digital Transformation Roadmap': 'digital-transformation-roadmap',
  'Customs & Trade Practice': 'customs-trade-practice',
  'Operations Standards - ISO': 'operations-standards-iso',
  'FTA & Rules of Origin Mastery': 'fta-rules-of-origin-master',
  'Legal Risk in Logistics': 'legal-risk-in-logistics',
  'Integrity & Digital Compliance': 'integrity-digital-compliance',
  'Industrial IoT & Sensors': 'industrial-iot-sensors',
  'Computer Vision in Operations Management': 'computer-vision-in-ops',
  'Real-time Monitoring Systems': 'realtime-monitoring-systems',
  'Predictive Maintenance (AIoT) - Bảo trì Dự báo': 'predictive-maintenance-aiot',
  'Predictive Maintenance (AIoT)': 'predictive-maintenance-aiot',
  'AIoT Strategic Roadmap': 'aiot-strategic-roadmap',
  'Technical Presentation Excellence': 'technical-presentation-excellence',
  'Structural Problem Solving': 'structural-problem-solving',
  'Project Execution for Engineers': 'project-execution-for-engineers',
  'Operational Leadership': 'operational-leadership',
  'Supply Chain Executive Path': 'supply-chain-executive-path',
}

function stripImages(text) {
  // Remove markdown image tags with base64 data
  let clean = text.replace(/!\[[^\]]*\]\(data:image[^)]{20,}\)/g, '')
  // Remove long base64 strings
  clean = clean.replace(/[A-Za-z0-9+/]{80,}={0,2}/g, '')
  return clean
}

function getSection(text, sectionTitle) {
  // Match content between **SectionTitle** and next **...**
  const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(
    `\\*\\*${escaped}\\*\\*[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n\\*\\*[^*]|$)`,
    'i'
  )
  const m = text.match(re)
  return m ? m[1] : ''
}

function parseBullets(text) {
  return text
    .split('\n')
    .map(l => l.replace(/^[-*•👉]\s*/, '').trim())
    .filter(l => l.length > 3 && !l.startsWith('**') && !l.startsWith('#') && !l.startsWith('['))
    .join('|')
}

function parseModules(courseText) {
  const section = getSection(courseText, 'Cấu trúc chương trình')
  if (!section) return ''
  const modules = []
  const lines = section.split('\n')
  for (const line of lines) {
    const m = line.trim().match(/^Module\s*\d+[:\.\s]+(.+)/)
    if (m) modules.push(m[1].trim())
  }
  return modules.join('|')
}

function parseFinalProject(courseText) {
  const section = getSection(courseText, 'Dự án cuối khóa')
  if (!section) return ''
  const lines = section
    .split('\n')
    .map(l => l.trim())
    .filter(l =>
      l.length > 10 &&
      !l.startsWith('**') &&
      !l.startsWith('#') &&
      !l.startsWith('[') &&
      !l.match(/^[-*•]?\s*(Sản phẩm đầu ra|🎯)/i)
    )
  return lines.slice(0, 3).join(' ').substring(0, 450)
}

function parseDeliveryFormat(courseText) {
  const section = getSection(courseText, 'Thông tin khóa học')
  const m = section.match(/Hình thức[:\s]+([^\n]+)/i)
  if (!m) return 'Online / Hybrid'
  return m[1].replace(/\(.*?\)/g, '').trim()
}

function translateDeliveryFormat(vi) {
  if (/Hybrid/i.test(vi)) return 'Online / Hybrid'
  if (/Trực tiếp|In-person/i.test(vi)) return 'In-person'
  if (/Trực tuyến|Online/i.test(vi)) return 'Online'
  return 'Online / Hybrid'
}

function parseMD(filePath) {
  console.log('  Reading md file...')
  const raw = fs.readFileSync(filePath, 'utf-8')
  console.log(`  File size: ${(raw.length / 1024 / 1024).toFixed(1)} MB`)

  const clean = stripImages(raw)
  console.log(`  After stripping images: ${(clean.length / 1024).toFixed(0)} KB`)

  // Split by course headings: **Course N: Title**
  const parts = clean.split(/\*\*Course \d+:\s*/)
  console.log(`  Found ${parts.length - 1} course sections`)

  const courses = new Map()
  let matched = 0, unmatched = []

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    // Title is first line up to ** or newline
    const titleMatch = part.match(/^([^\n*]+)/)
    if (!titleMatch) continue

    const rawTitle = titleMatch[1].replace(/\*+$/, '').trim()
    const slug = SLUG_MAP[rawTitle]

    if (!slug) {
      unmatched.push(rawTitle)
      continue
    }

    const targetAudienceSection = getSection(part, 'Đối tượng tham gia')
    const targetAudience = parseBullets(targetAudienceSection)
    const modules = parseModules(part)
    const finalProject = parseFinalProject(part)
    const deliveryFormatVi = parseDeliveryFormat(part)
    const deliveryFormatEn = translateDeliveryFormat(deliveryFormatVi)

    courses.set(slug, {
      target_audience_vi: targetAudience,
      target_audience_en: targetAudience,
      modules_vi: modules,
      modules_en: modules,
      final_project_vi: finalProject,
      final_project_en: finalProject,
      delivery_format_vi: deliveryFormatVi,
      delivery_format_en: deliveryFormatEn,
    })
    matched++
  }

  if (unmatched.length > 0) {
    console.warn(`  ⚠ Unmatched titles (${unmatched.length}):`, unmatched)
  }
  console.log(`  ✓ Parsed ${matched} courses`)
  return courses
}

// ── Main ───────────────────────────────────────────────────────────────────

const NEW_COLUMNS = [
  'target_audience_vi', 'target_audience_en',
  'modules_vi', 'modules_en',
  'final_project_vi', 'final_project_en',
  'delivery_format_vi', 'delivery_format_en',
  'image_url',
]

async function main() {
  console.log('🔑 Getting access token...')
  const token = await getAccessToken()
  console.log('  ✓ Token obtained')

  console.log('\n📋 Discovering sheet tab name...')
  const tabName = await getTabName(token)
  console.log(`  ✓ Tab name: "${tabName}"`)

  console.log('\n📊 Fetching current sheet data...')
  const result = await sheetsGet(token, `${tabName}!A:Z`)
  const rows = result.values || []
  if (rows.length === 0) throw new Error('Sheet is empty or tab name is wrong')
  console.log(`  ✓ Fetched ${rows.length} rows (including header)`)

  const oldHeaders = rows[0]
  console.log(`  Current columns (${oldHeaders.length}): ${oldHeaders.join(', ')}`)

  // Build new deduplicated header
  const seen = new Set(oldHeaders)
  const additionalCols = NEW_COLUMNS.filter(c => !seen.has(c))
  const newHeaders = [...oldHeaders, ...additionalCols]
  console.log(`  Adding ${additionalCols.length} new columns: ${additionalCols.join(', ')}`)

  const oldIdx = Object.fromEntries(oldHeaders.map((h, i) => [h, i]))
  const newIdx = Object.fromEntries(newHeaders.map((h, i) => [h, i]))

  console.log('\n📖 Parsing md file...')
  const mdPath = path.join(ROOT, 'tmp_docs', 'request-course-details.md')
  const parsedMap = parseMD(mdPath)

  console.log('\n🔨 Building updated rows...')
  const dataRows = [newHeaders]
  let updated = 0, skipped = 0

  for (let i = 1; i < rows.length; i++) {
    const row = [...rows[i]]
    const slug = row[oldIdx['slug']] || ''
    if (!slug.trim()) continue

    // Extend row to new header length
    while (row.length < newHeaders.length) row.push('')

    // Set image_url always
    row[newIdx['image_url']] = `/images/courses/course-${slug}.webp`

    const parsed = parsedMap.get(slug)
    if (parsed) {
      for (const [col, val] of Object.entries(parsed)) {
        if (newIdx[col] !== undefined) {
          row[newIdx[col]] = val
        }
      }
      updated++
    } else {
      skipped++
    }

    dataRows.push(row)
  }

  console.log(`  ✓ ${updated} rows enriched from md, ${skipped} rows kept as-is`)

  console.log('\n🗑  Clearing sheet...')
  await sheetsClear(token, `${tabName}!A:Z`)
  console.log('  ✓ Cleared')

  console.log('\n📝 Writing all data...')
  await sheetsBatchUpdate(token, [{
    range: `${tabName}!A1`,
    values: dataRows,
  }])

  console.log('\n✅ Done!')
  console.log(`   Columns: ${newHeaders.length}`)
  console.log(`   Rows written: ${dataRows.length - 1}`)
  console.log(`   Courses enriched: ${updated}`)
  console.log(`   Courses kept as-is: ${skipped}`)
}

main().catch(err => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
