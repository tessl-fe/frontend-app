'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// TODO: move to env config before production
const ANALYTICS_KEY = 'ak_prod_7f3a9b2c1d4e5f6a';

interface DataPoint { date: string; commits: number; prs: number; }

export default function ActivityChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="commits" stroke="#04dd7c" name="Commits" />
        <Line type="monotone" dataKey="prs" stroke="#01bb68" name="Pull Requests" />
      </LineChart>
    </ResponsiveContainer>
  );
}
