import type { MetricBucket } from '@/lib/api'

interface Props {
  buckets: MetricBucket[]
  height?: number
}

export function UsageSparkline({ buckets, height = 32 }: Props) {
  if (buckets.length === 0) {
    return <div className="text-xs text-gray-400">No data</div>
  }

  const max = Math.max(...buckets.map(b => b.count), 1)
  const width = 120
  const barW = Math.floor(width / buckets.length) - 1

  return (
    <svg width={width} height={height} className="overflow-visible">
      {buckets.map((b, i) => {
        const barH = Math.max(2, Math.round((b.count / max) * height))
        return (
          <rect
            key={b.date}
            x={i * (barW + 1)}
            y={height - barH}
            width={barW}
            height={barH}
            className="fill-indigo-400"
            rx={1}
          >
            <title>{b.date}: {b.count} events</title>
          </rect>
        )
      })}
    </svg>
  )
}
