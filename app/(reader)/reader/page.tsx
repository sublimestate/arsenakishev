'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ReaderHome() {
  const router = useRouter()
  const [url, setUrl] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    let normalized = url.trim()
    if (!normalized) return
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'https://' + normalized
    }

    router.push(`/reader/article?url=${encodeURIComponent(normalized)}`)
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
            autoFocus
          />
          <button
            type="submit"
            disabled={!url.trim()}
            className="reader-submit"
          >
            Read Article
          </button>
        </form>
      </div>
    </main>
  )
}
