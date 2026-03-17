import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { contactLinks } from '@/data/profile'

const socialLinks = contactLinks.filter((l) => l.label !== 'Email')

export default function NotFound() {
  return (
    <div className="site">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <NavBar />

      <main className="page-wrapper">
        <div className="not-found-page">
          <div>
            <p className="not-found-code">404</p>
            <h2>Page not found</h2>
            <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Link href="/" className="btn ghost">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Arsen Akishev. Built with Next.js.</p>
        <div className="footer-links">
          <a href="mailto:arsenakishev@gmail.com">arsenakishev@gmail.com</a>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
