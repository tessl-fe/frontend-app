'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, Project, MetricBucket } from '@/lib/api'
import { isLoggedIn, clearTokens } from '@/lib/auth'
import { ProjectCard } from '@/components/ProjectCard'

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [metrics, setMetrics] = useState<Record<string, MetricBucket[]>>({})
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/login'); return }
    loadProjects()
  }, [])

  async function loadProjects() {
    setLoading(true)
    try {
      const list = await api.projects.list()
      setProjects(list)
      // Load metrics for each project in parallel
      const entries = await Promise.all(
        list.map(async p => {
          try {
            const { buckets } = await api.metrics.get(p.id)
            return [p.id, buckets] as [string, MetricBucket[]]
          } catch {
            return [p.id, []] as [string, MetricBucket[]]
          }
        })
      )
      setMetrics(Object.fromEntries(entries))
    } catch {
      router.replace('/login')
    } finally {
      setLoading(false)
    }
  }

  async function createProject() {
    if (!newName.trim()) return
    setCreating(true)
    try {
      const project = await api.projects.create(newName.trim())
      setProjects(prev => [project, ...prev])
      setNewName('')
    } finally {
      setCreating(false)
    }
  }

  function logout() {
    clearTokens()
    router.push('/login')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-2">
          <a href="/settings" className="text-sm text-gray-500 hover:text-gray-900 px-2 py-1">Settings</a>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900 px-2 py-1">Sign out</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={newName} onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && createProject()}
          placeholder="New project name"
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={createProject} disabled={creating || !newName.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors">
          {creating ? '…' : 'Create'}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-sm">No projects yet. Create one above.</p>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              buckets={metrics[p.id] ?? []}
              onClick={() => router.push(`/dashboard/${p.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
