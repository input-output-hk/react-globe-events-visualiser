<p align="right">
  <a href="https://circleci.com/gh/input-output-hk/react-globe-events-visualiser" target="_blank" title="CircleCI status">
    <img src="https://circleci.com/gh/input-output-hk/react-globe-events-visualiser.svg?style=svg&circle-token=5b2243626bfb0db484518cb2e0e2c11e33531b66" alt="CircleCI status" />
  </a>
  <a href="https://input-output-hk.github.io/react-globe-events-visualiser/index.html" target="_blank" title="Demo">
    <img src="https://img.shields.io/badge/%E2%9A%93-Demo-yellow.svg" alt="Demo" />
  </a>
</p>

<h1 align="center">
  🌎 - React events WebGL globe visualisation
</h1>

<p align="center">
  This library is for creating a 3D visualisation of events around the globe in React using <a href="https://threejs.org/" title="THREE.js" target="_blank">THREE.js</a>.
</p>

## Make it so
```
npm install --save git+https://git@github.com/input-output-hk/react-globe-events-visualiser#v1
```
The most basic example
```
import EventsGlobe from 'react-globe-events'

const events = [
  [
    {
      id: '123',
      lat: -25.0253898,
      lon: 46.9540537,
      name: 'Washington DC meetup',
      location: 'Washington',
      datetime: '05-20-2025 18:00',
      url: 'https://example.org/'
    }
  ]
]

export default () => (
  <EventsGlobe
    events={events}
    width={window.innerWidth}
    height={window.innerHeight}
  />
)

```
For a full list of props see https://github.com/input-output-hk/react-globe-events-visualiser/blob/master/src/Events.js#L20

## Contributing

To make changes branch from `staging` and create a PR with the changes. Once ready to merge into production ensure the package.json version number is updated following [Semantic Versioning](https://semver.org/). Once the code has been merged to master CI will create the relevant tags for the release.
