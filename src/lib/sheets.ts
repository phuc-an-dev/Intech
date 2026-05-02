const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? ''
const COURSES_GID = process.env.GOOGLE_SHEET_COURSES_GID ?? '967114232'
const TOPICS_GID = process.env.GOOGLE_SHEET_TOPICS_GID ?? '2140382411'

function splitCSVLines(text: string): string[] {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < normalized.length; i++) {
    const c = normalized[i]
    if (c === '"') {
      if (inQuotes && normalized[i + 1] === '"') { current += '""'; i++ }
      else { inQuotes = !inQuotes; current += c }
    } else if (c === '\n' && !inQuotes) {
      lines.push(current)
      current = ''
    } else {
      current += c
    }
  }
  if (current) lines.push(current)
  return lines.filter(l => l.trim())
}

function parseRow(line: string): string[] {
  const fields: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { field += '"'; i++ }
      else { inQuotes = !inQuotes }
    } else if (c === ',' && !inQuotes) {
      fields.push(field)
      field = ''
    } else {
      field += c
    }
  }
  fields.push(field)
  return fields
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = splitCSVLines(text)
  if (lines.length < 2) return []
  const headers = parseRow(lines[0]).map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = parseRow(line)
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? '').trim()]))
  })
}

async function fetchSheet(gid: string): Promise<Record<string, string>[]> {
  if (!SHEET_ID) return []
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Sheet fetch failed (${res.status})`)
  return parseCSV(await res.text())
}

export function fetchCoursesSheet(): Promise<Record<string, string>[]> {
  return fetchSheet(COURSES_GID)
}

export function fetchTopicsSheet(): Promise<Record<string, string>[]> {
  return fetchSheet(TOPICS_GID)
}
