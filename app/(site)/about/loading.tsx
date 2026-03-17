import { SkeletonLine, SkeletonCard } from '@/components/Skeleton'

export default function AboutLoading() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-photo-wrapper">
          <div className="skel" style={{ width: '100%', height: '100%', minHeight: '300px' }} />
        </div>
        <div className="about-copy">
          <SkeletonLine width="100px" height="12px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="80%" height="36px" style={{ marginBottom: '1rem' }} />
          <SkeletonLine width="140px" height="42px" style={{ borderRadius: '999px' }} />
        </div>
      </section>

      <section className="section about-details">
        <SkeletonCard>
          <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="200px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="180px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="140px" height="14px" />
        </SkeletonCard>
        <SkeletonCard>
          <SkeletonLine width="120px" height="24px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonLine width="240px" height="14px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonLine width="200px" height="14px" />
        </SkeletonCard>
      </section>
    </div>
  )
}
