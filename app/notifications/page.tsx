'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/lib/auth'

interface Notification {
  id: string
  message: string
  read: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) { router.replace('/login'); return }
    fetchNotifications()
  }, [])

  async function fetchNotifications() {
    try {
      // TODO: wire up to real endpoint
      const data: Notification[] = []
      console.log('notifications:', data)
      setNotifications(data)
    } catch (err) {
      console.error('failed to fetch notifications:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-8 text-gray-400 text-sm">Loading…</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-400 text-sm">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map(n => (
            <li key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-white border-gray-200' : 'bg-indigo-50 border-indigo-200'}`}>
              <p className="text-sm text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
