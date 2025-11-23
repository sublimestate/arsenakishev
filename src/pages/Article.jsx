import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/profile'

function Article() {
  const { id } = useParams()
  const article = articles.find((a) => a.id === id)

  if (!article) {
    return (
      <div className="page article-page">
        <section className="section">
          <div className="section-header">
            <h1>Article not found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/writing" className="btn ghost">
              Back to Writing
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page article-page">
      <section className="section">
        <Link to="/writing" className="back-link">
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

export default Article

