const {
  flow, map, omit, propertyOf, reduce, set, sumBy,
} = require('lodash/fp')
const fieldFuncs = require('./message')

const fieldOrder = [
  'position', // 8
  'sog', // 1
  'cog', // 1
  'heading', // 1
  'waterTemp',
  'windSpeed',
  'windDirection',
  // 'attitude',
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

// DECODE

function msgReducer(buff) {
  return (res, fieldInfo) => {
    const { decode, id, size } = fieldInfo
    const start = res.buffPos
    const end = start + size
    const fieldBuff = buff.slice(start, end)
    return flow(
      set('buffPos', end),
      set(id, decode(fieldBuff)),
    )(res)
  }
}
function hexBuff(hexString) {
  return Buffer.from(hexString, 'hex')
}
function decodeMessage(hexString) {
  return omit('buffPos', reduce(msgReducer(hexBuff(hexString)), { buffPos: 0 }, fields))
}

module.exports = {
  decodeMessage,
  encodeMessage,
  fieldOrder,
}
