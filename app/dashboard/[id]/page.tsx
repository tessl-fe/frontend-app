'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { api, Project } from '@/lib/api'
import { isLoggedIn } from '@/lib/auth'
import { ApiKeyList } from '@/components/ApiKeyList'

export default function ProjectDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/login'); return }
    loadProject()
  }, [id])

  async function loadProject() {
    setLoading(true)
    try {
      const p = await api.projects.get(id)
      setProject(p)
      setName(p.name)
    } catch {
      router.replace('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  async function saveName() {
    if (!name.trim() || !project) return
    const updated = await api.projects.update(id, name.trim())
    setProject(updated)
    setEditing(false)
  }

  async function deleteProject() {
    if (!confirm(`Delete "${project?.name}"? This cannot be undone.`)) return
    await api.projects.delete(id)
    router.push('/dashboard')
  }

  async function archiveProject() {
    if (!confirm(`Archive "${project?.name}"? You can restore it later.`)) return
    await api.projects.update(id, project!.name)
    router.push('/dashboard')
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8 text-gray-400 text-sm">Loading…</div>
  if (!project) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-700 mb-4 inline-block">← Back</a>

      <div className="flex items-center gap-3 mb-6">
        {editing ? (
          <>
            <input value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditing(false) }}
              className="text-2xl font-bold border-b border-indigo-400 focus:outline-none bg-transparent flex-1"
              autoFocus
            />
            <button onClick={saveName} className="text-sm text-indigo-600 hover:underline">Save</button>
            <button onClick={() => setEditing(false)} className="text-sm text-gray-400 hover:text-gray-700">Cancel</button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold flex-1">{project.name}</h1>
            <button onClick={() => setEditing(true)} className="text-sm text-gray-400 hover:text-gray-700">Rename</button>
            <button onClick={archiveProject} className="text-sm text-yellow-600 hover:text-yellow-800">Archive</button>
            <button onClick={deleteProject} className="text-sm text-red-400 hover:text-red-600">Delete</button>
          </>
        )}
      </div>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">API Keys</h2>
        <ApiKeyList
          projectId={project.id}
          apiKeys={project.apiKeys ?? []}
          onRefresh={loadProject}
        />
      </section>
    </div>
  )
}
