import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles } from '@/data/profile'

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = articles.find((a) => a.id === id)

  if (!article) {
    notFound()
  }

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
      </section>
    </div>
  )
}
