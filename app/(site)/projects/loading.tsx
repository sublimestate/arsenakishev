import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function ProjectsLoading() {
  return (
    <div className="page">
      <section className="section projects">
        <div className="section-header">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="50%" height="32px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="55%" height="16px" />
        </div>
        <div className="project-grid">
          {[1, 2].map((i) => (
            <SkeletonCard key={i} style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <SkeletonLine width="140px" height="20px" style={{ marginBottom: '0.5rem' }} />
                <SkeletonLine width="100%" height="14px" style={{ marginBottom: '0.4rem' }} />
                <SkeletonLine width="75%" height="14px" />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[1, 2, 3].map((j) => (
                  <SkeletonLine key={j} width="70px" height="26px" style={{ borderRadius: '999px' }} />
                ))}
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}
