import _ from 'lodash/fp'

const fields = [
  'navigation.position',
  'navigation.speedOverGround',
  'navigation.courseOverGroundTrue',
  'navigation.headingTrue',
]

// Send it getSelfPath function.
const getProps = _.flow(
  _.map(_, fields),
  _.zipObject(fields),
)

module.exports = getProps
