/* globals describe test expect */
const { decodeMessage, encodeMessage } = require('./buildMsg')

const props = {
  cog: 32.2,
  position: [-73.9524034, 37.2404432],
  sog: 3.48,
  heading: 202,
  waterTemp: 20.2,
  windSpeed: 30.3,
  windDirection: 280,
}
const result = {
  cog: 32,
  position: [-73.95240020751953, 37.24044418334961],
  sog: 3.5,
  heading: 201,
  waterTemp: 20.2,
  windSpeed: 30.3,
  windDirection: 280,
}

describe('encodeMessage', () => {
  test('Takes props and returns buffer.', () => {
    const buff = encodeMessage(props)
    // console.log(buff)
    // console.log(buff.toString('hex'))
    expect(buff.toString('hex'))
      .toBe('c293e7a14214f63768178f7979c7')
  })
})
describe('decodeMessage', () => {
  test('Takes hex string and returns props object.', () => {
    expect(decodeMessage('c293e7a14214f63768178f7979c7'))
      .toMatchObject(result)
  })
})
