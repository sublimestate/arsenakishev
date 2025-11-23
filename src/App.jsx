import { NavLink, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Writing from './pages/Writing'
import Article from './pages/Article'
import './App.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/writing', label: 'Writing' },
]

function App() {
  return (
    <div className="site">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <header className="site-nav">
        <Link to="/" className="brand">
          Arsen Akishev
        </Link>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:id" element={<Article />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Arsen Akishev. Built with React + Vite.</p>
        <a href="mailto:arsenakishev@gmail.com">arsenakishev@gmail.com</a>
      </footer>
    </div>
  )
}

export default App
