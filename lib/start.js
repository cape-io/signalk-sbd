const _ = require('lodash/fp')
const getProps = require('./select')
const { encodeMessage } = require('signalk-sbd-msg')
const { startIridium } = require('./iridium')

const createMessage = app => () => {
  const props = getProps(app.getSelfPath)
  console.log(props)
  const message = encodeMessage(props)
  // console.log(message)
  app.ref.invoke('sendMessage', [message])
}

function startInterval(app, { updateMinutes }) {
  app.ref.addInterval('createMessage', createMessage(app), updateMinutes * 60)
}

function buildSendMessage(app, props) {
  const sendMsg = (message) => {
    console.log('sndMsg', props.device, message)
  }
  app.ref.set('sendMessage', sendMsg)
  startIridium(app, props)
}

const start = _.curry((app, props) => {
  console.log('SBD START')
  startInterval(app, props)
  buildSendMessage(app, props)
  return Promise.resolve()
})

module.exports = start
