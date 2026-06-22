'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Form, Input, Button, Card, Alert } from 'antd'
import { Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onFinish(values: { email: string; password: string }) {
    setPending(true)
    setError('')
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    setPending(false)
    if (res?.error) {
      setError('Email hoặc mật khẩu không đúng')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 700, color: '#002D62' }}>Intech</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1.5,
                color: '#fff',
                background: '#002D62',
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              ADMIN
            </span>
          </div>
          <div style={{ color: '#8c8c8c', fontSize: 14 }}>Đăng nhập để quản lý nội dung</div>
        </div>

        <Card variant="outlined" style={{ boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
          {error && (
            <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />
          )}
          <Form layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input
                prefix={<Mail size={16} style={{ color: '#bfbfbf' }} />}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password
                prefix={<Lock size={16} style={{ color: '#bfbfbf' }} />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block loading={pending}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
