
function precisionRound(number, precision) {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

// Returns position.
function decodePosition(buf) {
  return [buf.readFloatBE(0), buf.readFloatBE(4)]
}
function encodePosition([pos1, pos2]) {
  const buf = Buffer.allocUnsafe(8)
  buf.writeFloatBE(pos1, 0)
  buf.writeFloatBE(pos2, 4)
  return buf
}

function fraction(ordinal) {
  return buf => precisionRound((buf.readUInt8() / ordinal), 1)
}
function multiple(multiplier) {
  return (num) => {
    const maxVal = 255 / multiplier
    const buf = Buffer.allocUnsafe(1)
    if (num > maxVal) return buf.writeUInt8(255, 0)
    buf.writeUInt8(Math.round(num * multiplier), 0)
    return buf
  }
}

const thirtyfold = multiple(30)
const thirtieth = fraction(30)

const deg8bit = 359 / 255
function decodeDegrees(buf) {
  const number = buf.readUInt8()
  const float = deg8bit * number
  return Math.round(float)
}
function encodeDegrees(degrees) {
  const float = degrees / deg8bit
  const number = Math.round(float)
  const buf = Buffer.allocUnsafe(1)
  buf.writeUInt8(number, 0)
  return buf
}
module.exports = {
  decodePosition,
  encodePosition,
  encodeDegrees,
  decodeDegrees,
  thirtieth,
  thirtyfold,
}
