const {
  decodePosition, encodePosition,
  encodeDegrees, decodeDegrees,
  fourth, quadruple,
  sixth, sextuple,
  thirtieth, thirtyfold,
} = require('./utils')

// POSITION
const position = {
  id: 'position',
  description: 'GPS Coordinates. Lon 32 bit float. Lat 32 bit float.',
  decode: decodePosition,
  encode: encodePosition,
  size: 8,
  bits: 64,
  required: true,
}

// SPEED OVER GROUND - 8.5 mps max
const sog = {
  id: 'sog',
  description: 'Speed over ground. Meters per second.',
  decode: thirtieth,
  encode: thirtyfold,
  size: 1,
  bits: 8,
  required: true,
}
const cog = {
  id: 'cog',
  description: 'Course over ground. True.',
  decode: decodeDegrees,
  encode: encodeDegrees,
  size: 1,
  bits: 8,
  required: true,
}
const speed = {
  id: 'speed',
  defaultValue: 0,
  description: 'Speed through the water.',
  decode: thirtieth,
  encode: thirtyfold,
  size: 1,
  bits: 8,
}

const heading = {
  id: 'heading',
  decode: decodeDegrees,
  encode: encodeDegrees,
  size: 1,
  bits: 8,
  description: 'Heading. Direction pointed.',
}
const waterTemp = {
  id: 'waterTemp',
  size: 1,
  description: 'water temp in C. Number. 1/6',
  decode: sixth,
  encode: sextuple,
}
const windSpeed = {
  id: 'windSpeed',
  description: 'Wind speed in kts.',
  decode: fourth,
  encode: quadruple,
  size: 1,
  bits: 8,
}
const windDirection = {
  id: 'windDirection',
  description: 'Direction wind is coming from.',
  decode: decodeDegrees,
  encode: encodeDegrees,
  size: 1,
  bits: 8,
}

module.exports = {
  position,
  sog,
  cog,
  speed,
  heading,
  waterTemp,
  windSpeed,
  windDirection,
}
