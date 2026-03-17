'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/writing', label: 'Writing' },
  { path: '/projects', label: 'Projects' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [open])

  return (
    <header className="site-nav" ref={navRef}>
      <Link href="/" className="brand">
        Arsen Akishev
      </Link>
      <button
        className="hamburger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
        <span className={`hamburger-bar${open ? ' open' : ''}`} />
      </button>
      <nav className={`nav-links${open ? ' open' : ''}`} aria-hidden={!open ? true : undefined}>
        {navLinks.map((link) => {
          const isActive =
            link.path === '/' ? pathname === '/' : pathname.startsWith(link.path)
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
