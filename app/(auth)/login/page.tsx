'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { saveTokens } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { accessToken, refreshToken } = await api.auth.login(email, password)
      saveTokens(accessToken, refreshToken)
      router.push('/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border w-96 space-y-4">
        <h1 className="text-xl font-semibold">Sign in to Forge</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email" required className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" required className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2 text-sm font-medium disabled:opacity-50 transition-colors">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-center text-sm text-gray-500">
          No account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </form>
    </main>
  )
}
