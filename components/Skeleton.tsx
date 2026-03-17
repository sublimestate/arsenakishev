export function SkeletonLine({ width = '100%', height = '14px', style }: {
  width?: string
  height?: string
  style?: React.CSSProperties
}) {
  return <div className="skel" style={{ width, height, ...style }} />
}

export function SkeletonCard({ children, style }: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="skel-card" style={style}>
      {children}
    </div>
  )
}
