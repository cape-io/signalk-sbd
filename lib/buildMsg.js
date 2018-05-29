const { map, propertyOf, sumBy } = require('lodash/fp')
const fieldFuncs = require('./message')

const fieldOrder = [
  'position', // 8
  'sog', // 1
  'cog', // 1
  'heading', // 1
]
const fields = map(propertyOf(fieldFuncs), fieldOrder)

// Send it a props object and get back a buffer.
function encodeMessage(props) {
  const encodeField = ({ encode, id }) => encode(props[id])
  // Check to make sure we have props for the entire message?
  // Use some default 0 value?
  // Map known fields to an array of buffers.
  const buffs = map(encodeField, fields)
  // Return joined array of buffs.
  return Buffer.concat(buffs, sumBy('length', buffs))
}

module.exports = encodeMessage
