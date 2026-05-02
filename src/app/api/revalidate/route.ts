import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/vi/courses', 'layout')
  revalidatePath('/en/courses', 'layout')
  revalidatePath('/vi', 'page')
  revalidatePath('/en', 'page')
  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
