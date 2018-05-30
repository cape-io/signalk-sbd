const _ = require('lodash/fp')
const { replaceField } = require('cape-lodash')
const degrees = require('radians-degrees')
const { fieldOrder } = require('./buildMsg')

const fieldPaths = [
  'navigation.position',
  'navigation.speedOverGround',
  'navigation.courseOverGroundTrue',
  'navigation.headingMagnetic',
  // 'speedThroughWater'
  'environment.water.temperature',
  'environment.wind.speedApparent',
  // 'environment.wind.angleApparent',
  // 'navigation.attitude',
]
// k to c -273.15

// Send it getSelfPath function.
const getProps = _.flow(
  get => _.flow(get, _.get('value')),
  _.map(_, fieldPaths),
  _.zipObject(fieldOrder),
  replaceField('position', ({ latitude, longitude }) => [longitude, latitude]),
  replaceField('cog', degrees),
  replaceField('heading', degrees),
  replaceField('waterTemp', kelvin => kelvin - 273.15),
  // replaceField('windDirection', degrees),
)

module.exports = getProps
