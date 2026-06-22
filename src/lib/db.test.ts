import { describe, expect, it } from 'vitest'
import { prisma } from './db'

describe('prisma client', () => {
  it('connects and runs a trivial query', async () => {
    const rows = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`
    expect(rows[0].ok).toBe(1n)
  })
})
