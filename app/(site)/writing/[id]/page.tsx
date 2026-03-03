import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles } from '@/data/profile'

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const index = sorted.findIndex((a) => a.id === id)
  const article = sorted[index]

  if (!article) {
    notFound()
  }

  const prev = sorted[index + 1] ?? null
  const next = sorted[index - 1] ?? null

  return (
    <div className="page article-page">
      <section className="section">
        <Link href="/writing" className="back-link">
          ← Back to Writing
        </Link>
        <article className="article-full">
          <header className="article-header-full">
            <h1 className="article-title-full">{article.title}</h1>
            <span className="article-date-full">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </header>
          {article.content && (
            <div className="article-content-full">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="article-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </article>
        {(prev || next) && (
          <nav className="article-nav">
            <div className="article-nav-prev">
              {prev && (
                <Link href={`/writing/${prev.id}`} className="article-nav-link">
                  <span className="article-nav-label">← Older</span>
                  <span className="article-nav-title">{prev.title}</span>
                </Link>
              )}
            </div>
            <div className="article-nav-next">
              {next && (
                <Link href={`/writing/${next.id}`} className="article-nav-link article-nav-link--right">
                  <span className="article-nav-label">Newer →</span>
                  <span className="article-nav-title">{next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </section>
    </div>
  )
}
