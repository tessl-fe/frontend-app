'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, clearTokens } from '@/lib/auth'

export default function SettingsPage() {
  const router = useRouter()
  const [backendUrl, setBackendUrl] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/login'); return }
    setBackendUrl(process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001')
  }, [])

  function logout() {
    clearTokens()
    router.push('/login')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-700 mb-4 inline-block">← Back</a>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <section className="bg-white border rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Environment</h2>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Backend API</span>
            <span className="font-mono text-gray-700">{backendUrl}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Data Service</span>
            <span className="font-mono text-gray-700">{process.env.NEXT_PUBLIC_DATA_URL ?? 'http://localhost:3002'}</span>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <button onClick={logout}
          className="text-sm text-red-500 hover:text-red-700 hover:underline">
          Sign out
        </button>
      </section>
    </div>
  )
}
