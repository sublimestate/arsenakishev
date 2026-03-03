import Link from 'next/link'
import { projects } from '@/data/profile'

export default function Projects() {
  return (
    <div className="page projects-page">
      <section className="section projects">
        <div className="section-header">
          <p className="eyebrow">Projects</p>
          <h1>Things I&apos;ve built.</h1>
          <p>Side projects and tools I&apos;ve put together outside of work.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <Link
              key={project.name}
              href={project.href}
              className="project-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="project-card__header">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <ul className="stack-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="project-result">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
