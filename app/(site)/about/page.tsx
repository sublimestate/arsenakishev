import { languagesList, education } from '@/data/profile'
import WorldMap from '@/components/WorldMap'

export default function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-photo-wrapper">
          <img src="/arsen_photo.jpg" alt="Portrait of Arsen Akishev" className="about-photo" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About me</p>
          <h1>{'Born in Kyrgyzstan and raised in NYC.'}</h1>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn ghost">
            View Resume
          </a>
        </div>
      </section>

      <section className="section about-details">
        <div className="about-panel">
          <h2>Languages</h2>
          <ul className="language-list">
            {languagesList.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <div className="about-panel">
          <h2>Education</h2>
          <ul className="education-list">
            {education.map((item) => (
              <li key={item.school}>
                <h3>{item.school}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section world-traveler">
        <div className="section-header">
          <p className="eyebrow">World Traveler</p>
          <h2>Places I&apos;ve explored.</h2>
          <p>From the bustling streets of New York to the historic landmarks of Paris, each journey has shaped my perspective.</p>
        </div>
        <WorldMap />
      </section>

      <section className="section pet-lover">
        <div className="section-header">
          <p className="eyebrow">Pet Lover</p>
          <h2>My furry companions.</h2>
          <p>These wonderful pets have brought joy and companionship into my life.</p>
        </div>
        <div className="pet-grid">
          <div className="pet-card">
            <img src="/daisy_photo.jpg" alt="Daisy the dog" className="pet-photo" />
            <h3>Daisy</h3>
            <p className="pet-type">Dog</p>
          </div>
          <div className="pet-card">
            <img src="/barsik_photo.jpg" alt="Barsik the cat" className="pet-photo" />
            <h3>Barsik</h3>
            <p className="pet-type">Cat</p>
          </div>
        </div>
      </section>
      <section className="section gym-stats">
        <div className="section-header">
          <p className="eyebrow">Gym Stats</p>
          <h2>Lifting numbers.</h2>
        </div>
        <div className="gym-grid">
          <div className="gym-card">
            <span className="gym-lift">Bench Press</span>
            <span className="gym-weight">135 lbs</span>
          </div>
          <div className="gym-card">
            <span className="gym-lift">Deadlift</span>
            <span className="gym-weight">195 lbs</span>
          </div>
          <div className="gym-card">
            <span className="gym-lift">Squat</span>
            <span className="gym-weight gym-weight--na">I don&apos;t squat</span>
          </div>
        </div>
      </section>
    </div>
  )
}
