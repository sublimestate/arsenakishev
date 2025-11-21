import { quickFacts, skillBuckets, contactLinks, summary } from '../data/profile'

function Home() {
  return (
    <div className="page home-page">
      <header className="hero" id="home">
        <p className="eyebrow">Arsen Akishev · Backend Software Engineer</p>
        <h1>Engineering backend platforms with AWS, Node.js, and PostgreSQL.</h1>
        <p className="lede">{summary}</p>
        <ul className="metric-grid">
          {quickFacts.map((metric) => (
            <li key={metric.label}>
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <section className="section skills" id="skills">
        <div className="section-header">
          <p className="eyebrow">Technical snapshot</p>
          <h2>From API design to observability.</h2>
          <p>Coverage across backend development, DevOps automation, and data-layer stewardship.</p>
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

      <section className="section contact" id="contact">
        <div className="contact-card">
          <p className="eyebrow">Connect</p>
          <h2>Let&apos;s collaborate on your next backend initiative.</h2>
          <p>
            Whether you need help scaling a data platform, refining CI/CD pipelines, or shipping a new backend service,
            I bring pragmatic leadership with hands-on execution.
          </p>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="contact-link">
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

