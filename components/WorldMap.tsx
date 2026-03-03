'use client'

import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const visitedCities = [
  { name: 'New York City', coordinates: [-74.006, 40.7128] },
  { name: 'Moscow', coordinates: [37.6173, 55.7558] },
  { name: 'Paris', coordinates: [2.3522, 48.8566] },
  { name: 'Bishkek', coordinates: [74.5698, 42.8746] },
  { name: 'Almaty', coordinates: [76.9124, 43.2220] },
  { name: 'Bangkok', coordinates: [100.5018, 13.7563] },
  { name: 'Tokyo', coordinates: [139.6917, 35.6895] },
  { name: 'Osaka', coordinates: [135.5023, 34.6937] },
  { name: 'Las Vegas', coordinates: [-115.1398, 36.1699] },
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522] },
  { name: 'Dallas', coordinates: [-96.7970, 32.7767] },
  { name: 'Miami', coordinates: [-80.1918, 25.7617] },
  { name: 'Cancun', coordinates: [-86.8515, 21.1619] },
  { name: 'St. Petersburg', coordinates: [30.3159, 59.9343] },
  { name: 'Singapore', coordinates: [103.8198, 1.3521] },
  { name: 'Bali', coordinates: [115.2167, -8.6705] },
  { name: 'San Francisco', coordinates: [-122.4194, 37.7749] },
  { name: 'London', coordinates: [-0.1278, 51.5074] },
  { name: 'Barcelona', coordinates: [2.1734, 41.3851] },
  { name: 'Dubai', coordinates: [55.2708, 25.2048] },
  { name: 'Istanbul', coordinates: [28.9784, 41.0082] },
  { name: 'Budapest', coordinates: [19.0402, 47.4979] },
  { name: 'Cairo', coordinates: [31.2357, 30.0444] },
  { name: 'Vienna', coordinates: [16.3738, 48.2082] },
  { name: 'Munich', coordinates: [11.5819, 48.1351] },
  { name: 'Philadelphia', coordinates: [-75.1652, 39.9526] },
  { name: 'Boston', coordinates: [-71.0589, 42.3601] },
  { name: 'Honolulu', coordinates: [-157.8583, 21.3069] },
  { name: 'Montreal', coordinates: [-73.5673, 45.5017] },
  { name: 'Athens', coordinates: [23.7275, 37.9838] },
  { name: 'Santorini', coordinates: [25.4615, 36.3932] },
  { name: 'Monaco', coordinates: [7.4246, 43.7384] },
  { name: 'Reykjavik', coordinates: [-21.8278, 64.1466] },
  { name: 'Amsterdam', coordinates: [4.9041, 52.3676] },
  { name: 'The Bahamas', coordinates: [-77.3500, 25.0479] },
  { name: 'Milan', coordinates: [9.1900, 45.4642] },
  { name: 'Florence', coordinates: [11.2558, 43.7696] },
  { name: 'Venice', coordinates: [12.3155, 45.4408] },
  { name: 'Rome', coordinates: [12.4964, 41.9028] },
  { name: 'Kyoto', coordinates: [135.7681, 35.0116] },
  { name: 'Chichen-Itza', coordinates: [-88.5681, 20.6843] },
] as const

export default function WorldMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 })

  return (
    <div className="map-container">
      <ComposableMap
        projectionConfig={{
          scale: 200,
          center: [0, 20],
        }}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={setPosition}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(51, 65, 85, 0.4)"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: 'rgba(51, 65, 85, 0.6)', outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {visitedCities.map((city) => {
            const zoom = position.zoom || 1
            const scaleFactor = zoom * 1.5
            const outerRadius = Math.max(4, 10 / scaleFactor)
            const middleRadius = Math.max(2, 5 / scaleFactor)
            const innerRadius = Math.max(1, 2.5 / scaleFactor)
            const strokeWidth = Math.max(0.5, 1.5 / scaleFactor)
            const textY = -12 / scaleFactor
            const fontSize = Math.max(8, 11 / scaleFactor)

            return (
              <Marker
                key={city.name}
                coordinates={city.coordinates}
                onMouseEnter={() => setHoveredCity(city.name)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <g style={{ cursor: 'pointer' }}>
                  <circle r={outerRadius} fill="transparent" />
                  <circle r={middleRadius} fill="#f59e0b" stroke="#fbbf24" strokeWidth={strokeWidth} />
                  <circle r={innerRadius} fill="#ffffff" />
                  {hoveredCity === city.name && (
                    <text
                      textAnchor="middle"
                      y={textY}
                      style={{
                        fontFamily: 'system-ui',
                        fill: '#fbbf24',
                        fontSize: `${fontSize}px`,
                        fontWeight: '600',
                        pointerEvents: 'none',
                      }}
                    >
                      {city.name}
                    </text>
                  )}
                </g>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
