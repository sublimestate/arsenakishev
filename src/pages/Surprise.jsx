import { useEffect, useState } from 'react'

function Surprise() {
  const [showName, setShowName] = useState(false)
  const [showCompliment, setShowCompliment] = useState(false)

  useEffect(() => {
    const nameTimeout = setTimeout(() => setShowName(true), 150)
    const complimentTimeout = setTimeout(() => setShowCompliment(true), 900)
    return () => {
      clearTimeout(nameTimeout)
      clearTimeout(complimentTimeout)
    }
  }, [])

  return (
    <div className="page surprise-page">
      <div className="surprise-card">
        <p className="eyebrow">A little surprise</p>
        <div className="flower-row" aria-hidden="true">
          <span>🌸</span>
          <span>🌷</span>
          <span>🌼</span>
        </div>
        <h1 className="surprise-message">
          <span className={`surprise-word${showName ? ' visible' : ''}`}>Aidai</span>
          <span className={`surprise-word compliment${showCompliment ? ' visible' : ''}`}>You look beautiful</span>
        </h1>
        <p>Thanks for being here — hope this brings a smile.</p>
      </div>
    </div>
  )
}

export default Surprise

