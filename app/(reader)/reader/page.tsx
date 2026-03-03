'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ReaderHome() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    let normalized = url.trim()
    if (!normalized) return
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'https://' + normalized
    }

    setLoading(true)
    try {
      const res = await fetch('/api/fetch-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Failed to fetch article.')
        return
      }

      router.push(`/reader/article?url=${encodeURIComponent(normalized)}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="reader-home">
      <div className="reader-card">
        <h1 className="reader-title">Article Reader</h1>
        <p className="reader-subtitle">
          Paste any article URL for a clean, distraction-free reading experience.
        </p>

        <form onSubmit={handleSubmit} className="reader-form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/some-article"
            className="reader-input"
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="reader-submit"
          >
            {loading ? 'Fetching article…' : 'Read Article'}
          </button>
        </form>

        {error && (
          <p className="reader-error">{error}</p>
        )}
      </div>
    </main>
  )
}
