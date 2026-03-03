import Link from 'next/link'
import { articles } from '@/data/profile'

export default function Writing() {
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="page writing-page">
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Writing</p>
          <h1>Articles and thoughts on backend engineering.</h1>
          <p>
            Exploring topics in software engineering, system design, and the craft of building reliable backend systems.
          </p>
        </div>
        <div className="article-list">
          {sortedArticles.map((article) => (
            <Link key={article.id} href={`/writing/${article.id}`} className="article-card-link">
              <article className="article-card">
                <div className="article-header">
                  <h3 className="article-title">{article.title}</h3>
                  <span className="article-date">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
