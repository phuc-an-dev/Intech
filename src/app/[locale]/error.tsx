'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-3">Đã xảy ra lỗi</h2>
        <p className="text-gray-500 mb-8">Trang này gặp sự cố. Vui lòng thử lại hoặc quay về trang chủ.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[#002D62] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#00A3C1] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Thử lại
        </button>
      </div>
    </div>
  )
}
