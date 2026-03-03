import '@/styles/app.css'
import NavBar from '@/components/NavBar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <NavBar />

      <main className="page-wrapper">{children}</main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Arsen Akishev. Built with Next.js.</p>
        <a href="mailto:arsenakishev@gmail.com">arsenakishev@gmail.com</a>
      </footer>
    </div>
  )
}
