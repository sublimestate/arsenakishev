import '@/styles/app.css'
import NavBar from '@/components/NavBar'
import { contactLinks } from '@/data/profile'

const socialLinks = contactLinks.filter((l) => l.label !== 'Email')

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <NavBar />

      <main className="page-wrapper">{children}</main>

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
