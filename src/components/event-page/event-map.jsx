import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { translitRU } from './../../utils/language-utils'

const googleMapURL = 'https://www.google.com/maps/embed/v1/place'
const googleAPIKey = 'AIzaSyB_JpZ8GN_chlj0Cacy7k2cEwAJ5yibrc8'

const MapFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`

const EventMap = ({ location, className }) => (
  <MapFrame
    frameBorder="0"
    className={className}
    src={`${googleMapURL}?key=${googleAPIKey}&q=${encodeURI(
      translitRU(location),
    )}`}
    allowfullscreen
  />
)

EventMap.propTypes = {
  location: PropTypes.string,
  className: PropTypes.string,
}

export default EventMap
