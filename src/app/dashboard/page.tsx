'use client';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
interface Metrics { activeUsers: number; tasksCompleted: number; teamVelocity: number; }
export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  useEffect(() => { api.getMetrics().then(setMetrics).catch(console.error); }, []);
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {metrics && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div><strong>{metrics.activeUsers}</strong><br />Active Users</div>
          <div><strong>{metrics.tasksCompleted}</strong><br />Tasks Completed</div>
          <div><strong>{metrics.teamVelocity}</strong><br />Velocity</div>
        </div>
      )}
    </main>
  );
}
