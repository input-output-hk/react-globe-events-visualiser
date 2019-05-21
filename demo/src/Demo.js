import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Events from '../../src/Events'

const events = [
  [
    {
      'id': '123',
      'lat': 32.840816497802734,
      'lon': -117.27436065673828,
      'name': 'San Diego Meetup',
      'location': 'San Diego, USA',
      'datetime': '2026-05-24 18:30',
      'url': 'https://example.org/'
    }
  ],
  [
    {
      'id': '456',
      'lat': 51.5285582,
      'lon': -0.2416805,
      'name': 'London Event',
      'location': 'London, United Kingdom',
      'datetime': '2026-05-24 17:30',
      'url': 'https://example.org/'
    },
    {
      'id': '789',
      'lat': 51.5285582,
      'lon': -0.2416805,
      'name': 'London Meetup',
      'location': 'London, United Kingdom',
      'datetime': '2027-05-24 19:45',
      'url': 'https://example.org/'
    }
  ],
  [
    {
      id: 'abc',
      lat: -25.0253898,
      lon: 46.9540537,
      name: 'Madagascar Event',
      location: 'Taolagnaro, Madagascar',
      datetime: '05-20-2025 18:00',
      url: 'https://example.org/'
    }
  ],
  [
    {
      'id': 'def',
      'lat': 35.6681625,
      'lon': 139.6007838,
      'name': 'Tokyo Meetup',
      'location': 'Tokyo, Japan',
      'datetime': '2027-05-24 18:30',
      'url': 'https://example.org/'
    }
  ]
]

const initRotationPoints = [
  {
    'lat': 32.840816497802734,
    'lon': -117.27436065673828
  },
  {
    'lat': 51.5285582,
    'lon': -0.2416805
  },
  {
    lat: -25.0253898,
    lon: 46.9540537
  },
  {
    'lat': 35.6681625,
    'lon': 139.6007838
  },
  {
    'lat': 32.840816497802734,
    'lon': -117.27436065673828
  }
]

const Demo = () => {
  const [ width, setWidth ] = useState(window.screen.availWidth)
  const [ height, setHeight ] = useState(window.screen.availHeight)

  const onResize = () => {
    setWidth(window.screen.availWidth)
    setHeight(window.screen.availHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <Events
      events={events}
      width={width}
      height={height}
      initRotationPoints={initRotationPoints}
      initRotationAnimationDuration={300}
      globeTextureURL='assets/images/textures/realistic-globe/globe.jpg'
      globeBumpTextureURL={null}
    />
  )
}

ReactDOM.render(<Demo />, document.getElementById('demo'))
