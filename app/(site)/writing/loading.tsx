import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function WritingLoading() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="65%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="55%" height="16px" />
        </div>
        <div className="article-list">
          {[1, 2].map((i) => (
            <SkeletonCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <SkeletonLine width="60%" height="20px" />
                <SkeletonLine width="120px" height="16px" />
              </div>
              <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonLine width="80%" height="14px" />
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
