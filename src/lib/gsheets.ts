import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

interface ServiceAccount {
  client_email: string
  private_key: string
}

let cachedToken: { value: string; expires: number } | null = null

function loadServiceAccount(): ServiceAccount {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) as ServiceAccount
  }
  // Local dev fallback: read file from project root
  const keyPath = path.join(process.cwd(), 'intech-495204-5bfbb0689257.json')
  return JSON.parse(fs.readFileSync(keyPath, 'utf-8')) as ServiceAccount
}

function base64url(buf: Buffer | string): string {
  const b = typeof buf === 'string' ? Buffer.from(buf) : buf
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires) return cachedToken.value

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
    cache: 'no-store',
  })

  const data = await res.json() as { access_token?: string }
  if (!data.access_token) throw new Error(`GSheet OAuth failed: ${JSON.stringify(data)}`)

  cachedToken = { value: data.access_token, expires: (now + 3500) * 1000 }
  return data.access_token
}

export async function appendRow(sheetName: string, values: (string | number)[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID not set')

  const token = await getAccessToken()
  const range = encodeURIComponent(`${sheetName}!A1`)

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [values] }),
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sheets append failed (${res.status}): ${err}`)
  }
}
