import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function ExperienceLoading() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <SkeletonLine width="120px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="70%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="50%" height="16px" />
        </div>
        <div className="experience-list">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <SkeletonLine width="160px" height="20px" />
                <SkeletonLine width="100px" height="16px" />
              </div>
              <SkeletonLine width="200px" height="16px" style={{ marginBottom: '0.75rem' }} />
              <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.5rem' }} />
              <SkeletonLine width="85%" height="14px" />
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
