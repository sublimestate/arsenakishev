'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/writing', label: 'Writing' },
  { path: '/projects', label: 'Projects' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header className="site-nav">
      <Link href="/" className="brand">
        Arsen Akishev
      </Link>
      <nav className="nav-links">
        {navLinks.map((link) => {
          const isActive =
            link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
