const _ = require('lodash/fp')
const getProps = require('./select')
const encodeMessage = require('./buildMsg')

const createMessage = app => () => {
  const props = getProps(app.getSelfPath)
  const message = encodeMessage(props).toString('hex')
  app.ref.invoke('sendMessage', [message])
}

function startInterval(app, updateMinutes) {
  app.ref.addInterval('createMessage', createMessage(app), updateMinutes)
}
function buildSendMessage(app, device) {
  // app.ref.set('iridium', iridium)
  return (message) => {
    console.log(device, message)
  }
}
const start = _.curry((app, { device, updateMinutes }) => {
  startInterval(app, updateMinutes)
  buildSendMessage(app, device)
  return Promise.resolve()
})

module.exports = start
