import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-bold text-[#002D62]">Đăng nhập Admin</h1>
        <LoginForm />
      </div>
    </div>
  )
}
