import Image from 'next/image'
import { languagesList, education } from '@/data/profile'
import WorldMap from '@/components/WorldMap'

const profileBlur = 'data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EAB0QAAEEAgMAAAAAAAAAAAAAAAEAAgMRBCEUUZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8AeTLkErS0AEKjkvO6b6se9oWeyhOjpSH/2Q=='
const daisyBlur = 'data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAKAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIFBv/EACAQAAIBAgcBAAAAAAAAAAAAAAEDAAIRBAUUIiMxQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ANLG4hgaK9hPnkrB6rDkEzeWk6Zwueolz9MC//9k='
const barsikBlur = 'data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAEF/8QAHRAAAQQCAwAAAAAAAAAAAAAAAQACAyEEETEycf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEhEv/aAAwDAQACEQMRAD8ApjkMjw5miBSCX5gJ4WxAdi7Qndj6pttQbp//2Q=='

export default function About() {
  return (
    <div className="page about-page">
      <section className="about-hero">
        <div className="about-photo-wrapper">
          <Image
            src="/arsen_photo.jpg"
            alt="Portrait of Arsen Akishev"
            width={756}
            height={1008}
            className="about-photo"
            placeholder="blur"
            blurDataURL={profileBlur}
            sizes="(max-width: 720px) 100vw, 360px"
            priority
          />
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
            <Image
              src="/daisy_photo.jpg"
              alt="Daisy the dog"
              width={200}
              height={200}
              className="pet-photo"
              placeholder="blur"
              blurDataURL={daisyBlur}
              sizes="200px"
            />
            <h3>Daisy</h3>
            <p className="pet-type">Dog</p>
          </div>
          <div className="pet-card">
            <Image
              src="/barsik_photo.jpg"
              alt="Barsik the cat"
              width={200}
              height={200}
              className="pet-photo"
              placeholder="blur"
              blurDataURL={barsikBlur}
              sizes="200px"
            />
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
