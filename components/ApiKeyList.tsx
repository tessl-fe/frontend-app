'use client'
import { useState } from 'react'
import type { ApiKey } from '@/lib/api'
import { api } from '@/lib/api'

interface Props {
  projectId: string
  apiKeys: ApiKey[]
  onRefresh: () => void
}

export function ApiKeyList({ projectId, apiKeys, onRefresh }: Props) {
  const [label, setLabel] = useState('')
  const [creating, setCreating] = useState(false)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  async function createKey() {
    setCreating(true)
    try {
      await api.apiKeys.create(projectId, label || undefined)
      setLabel('')
      onRefresh()
    } finally {
      setCreating(false)
    }
  }

  async function deleteKey(id: string) {
    if (!confirm('Revoke this API key? This cannot be undone.')) return
    await api.apiKeys.delete(id)
    onRefresh()
  }

  function toggleReveal(id: string) {
    setRevealed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={label} onChange={e => setLabel(e.target.value)}
          placeholder="Key label (optional)"
          className="flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={createKey} disabled={creating}
          className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors">
          {creating ? '…' : 'New key'}
        </button>
      </div>

      {apiKeys.length === 0 && (
        <p className="text-sm text-gray-400">No API keys yet.</p>
      )}

      <ul className="space-y-2">
        {apiKeys.map(k => (
          <li key={k.id} className="flex items-center gap-2 text-sm font-mono bg-gray-50 border rounded px-3 py-2">
            <span className="text-gray-500 text-xs w-24 truncate">{k.label || 'unlabeled'}</span>
            <span className="flex-1 text-gray-700">
              {revealed.has(k.id) ? k.key : k.key.slice(0, 8) + '••••••••'}
            </span>
            <button onClick={() => toggleReveal(k.id)}
              className="text-gray-400 hover:text-gray-700 text-xs">
              {revealed.has(k.id) ? 'hide' : 'show'}
            </button>
            <button onClick={() => deleteKey(k.id)}
              className="text-red-400 hover:text-red-600 text-xs">
              revoke
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
