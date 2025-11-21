import { experiences, earlierRoles, skillBuckets } from '../data/profile'

function Experience() {
  return (
    <div className="page experience-page">
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Experience</p>
          <h1>End-to-end ownership across backend and platform work.</h1>
          <p>
            I thrive on shipping dependable services for ambitious teams, whether the mandate is privacy-first fintech,
            blockchain integrations, or high-frequency infrastructure.
          </p>
        </div>
        <div className="experience-list">
          {experiences.map((role) => (
            <article key={`${role.company}-${role.timeframe}`} className="experience-card">
              <div>
                <div className="experience-top">
                  <h3>{role.company}</h3>
                  <span>{role.timeframe}</span>
                </div>
                <p className="experience-title">{role.title}</p>
                <p className="experience-summary">{role.summary}</p>
              </div>
              <ul className="impact-list">
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Earlier roles</p>
          <h2>Internships and research.</h2>
          <p>Each engagement sharpened a different part of my toolkit — from monitoring systems to trading infrastructure.</p>
        </div>
        <div className="timeline-grid">
          {earlierRoles.map((role) => (
            <article key={`${role.company}-${role.timeframe}`} className="timeline-card">
              <h3>
                {role.projectUrl && !role.projectName ? (
                  <a href={role.projectUrl} target="_blank" rel="noreferrer" className="timeline-link">
                    {role.company}
                  </a>
                ) : (
                  <>
                    {role.company}
                    {role.projectUrl && role.projectName && (
                      <span className="project-badge">
                        {' · '}
                        <a href={role.projectUrl} target="_blank" rel="noreferrer" className="timeline-link">
                          {role.projectName}
                        </a>
                      </span>
                    )}
                  </>
                )}
              </h3>
              <p className="timeline-role">{role.title}</p>
              <p className="timeline-meta">
                {role.timeframe} · {role.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Tooling & strengths</p>
          <h2>Hands-on builder with a systems mindset.</h2>
          <p>Comfortable across backend product development, data modeling, and platform reliability.</p>
        </div>
        <div className="skill-grid">
          {skillBuckets.map((bucket) => (
            <div key={bucket.title} className="skill-card">
              <h3>{bucket.title}</h3>
              <ul className="tag-list">
                {bucket.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Experience

