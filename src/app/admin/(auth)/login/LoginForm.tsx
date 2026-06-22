'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError('')
    const form = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })
    setPending(false)
    if (res?.error) { setError('Email hoặc mật khẩu không đúng'); return }
    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input name="email" type="email" required placeholder="Email"
        className="rounded border px-3 py-2" />
      <input name="password" type="password" required placeholder="Mật khẩu"
        className="rounded border px-3 py-2" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={pending}
        className="rounded bg-[#002D62] px-3 py-2 font-semibold text-white disabled:opacity-50">
        {pending ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>
    </form>
  )
}
