'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import DOMPurify from 'dompurify'

interface Article {
  title: string | null
  byline: string | null
  content: string | null
  excerpt: string | null
  siteName: string | null
  source: 'direct' | 'google-referrer' | 'googlebot' | 'wayback' | 'archive.ph'
}

function ArticleContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get('url')

  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!url) {
      router.replace('/reader')
      return
    }

    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/fetch-article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error ?? 'Failed to fetch article.')
        } else {
          setArticle(data)
        }
      } catch {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [url, router])

  if (loading) {
    return (
      <main className="reader-page">
        <div className="reader-content">
          <div className="reader-skeleton-line" style={{ width: '25%' }} />
          <div className="reader-skeleton-line" style={{ width: '75%', height: '2rem', marginBottom: '1rem' }} />
          <div className="reader-skeleton-line" style={{ width: '33%' }} />
          <div style={{ marginTop: '2rem' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="reader-skeleton-line"
                style={{ width: `${85 + (i % 3) * 5}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="reader-page">
        <div className="reader-content" style={{ textAlign: 'center' }}>
          <p className="reader-error">{error}</p>
          <Link href="/reader" className="reader-back-link" style={{ marginTop: '1.5rem' }}>
            ← Try another URL
          </Link>
        </div>
      </main>
    )
  }

  if (!article) return null

  return (
    <main className="reader-page">
      <div className="reader-content">
        <Link href="/reader" className="reader-back-link">
          ← Home
        </Link>

        <div className="reader-meta">
          {article.siteName && <span className="reader-site-name">{article.siteName}</span>}
          {article.source === 'wayback' && (
            <span className="reader-badge reader-badge--wayback">via Wayback Machine</span>
          )}
          {article.source === 'google-referrer' && (
            <span className="reader-badge reader-badge--google">via Google</span>
          )}
          {article.source === 'googlebot' && (
            <span className="reader-badge reader-badge--google">via Googlebot</span>
          )}
          {article.source === 'direct' && (
            <span className="reader-badge reader-badge--direct">direct</span>
          )}
          {article.source === 'archive.ph' && (
            <span className="reader-badge reader-badge--wayback">via archive.ph</span>
          )}
        </div>

        {article.title && (
          <h1 className="reader-article-title">{article.title}</h1>
        )}

        {article.byline && (
          <p className="reader-byline">{article.byline}</p>
        )}

        {article.excerpt && !article.content && (
          <p className="reader-excerpt">{article.excerpt}</p>
        )}

        <hr className="reader-divider" />

        {article.content && (
          <div
            className="reader-prose"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
          />
        )}

        <div className="reader-footer">
          <Link href="/reader" className="reader-back-link">
            ← Read another article
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ArticlePage() {
  return (
    <Suspense fallback={
      <main className="reader-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#a8a29e' }}>Loading…</div>
      </main>
    }>
      <ArticleContent />
    </Suspense>
  )
}
