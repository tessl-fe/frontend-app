import type { Project, MetricBucket } from '@/lib/api'
import { UsageSparkline } from './UsageSparkline'

interface Props {
  project: Project
  buckets: MetricBucket[]
  onClick: () => void
}

export function ProjectCard({ project, buckets, onClick }: Props) {
  const total = buckets.reduce((sum, b) => sum + b.count, 0)

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{project.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {total.toLocaleString()} events · last 30d
          </p>
        </div>
        <UsageSparkline buckets={buckets} />
      </div>
    </button>
  )
}
