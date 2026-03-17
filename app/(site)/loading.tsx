import { SkeletonLine } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="page">
      <header className="hero">
        <SkeletonLine width="280px" height="12px" style={{ marginBottom: '0.75rem' }} />
        <SkeletonLine width="80%" height="40px" style={{ marginBottom: '0.5rem' }} />
        <SkeletonLine width="60%" height="40px" style={{ marginBottom: '1.25rem' }} />
        <SkeletonLine width="90%" height="16px" style={{ marginBottom: '0.5rem' }} />
        <SkeletonLine width="70%" height="16px" style={{ marginBottom: '2rem' }} />
        <ul className="metric-grid">
          {[1, 2, 3].map((i) => (
            <li key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'rgba(12,15,32,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.35rem' }} />
              <SkeletonLine width="80px" height="14px" />
            </li>
          ))}
        </ul>
      </header>
    </div>
  )
}
