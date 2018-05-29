const _ = require('lodash/fp')
const getProps = require('./select')
const { encodeMessage } = require('./buildMsg')

const createMessage = app => () => {
  const props = getProps(app.getSelfPath)
  const message = encodeMessage(props).toString('hex')
  console.log(message)
  app.ref.invoke('sendMessage', [message])
}

function startInterval(app, updateMinutes) {
  app.ref.addInterval('createMessage', createMessage(app), updateMinutes * 60)
}

function buildSendMessage(app, device) {
  // app.ref.set('iridium', iridium)
  const sendMsg = (message) => {
    console.log(device, message)
  }
  app.ref.set('sendMessage', sendMsg)
}

const start = _.curry((app, { device, updateMinutes }) => {
  console.log('SBD START')
  startInterval(app, updateMinutes)
  buildSendMessage(app, device)
  return Promise.resolve()
})

module.exports = start
