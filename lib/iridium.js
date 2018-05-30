const _ = require('lodash/fp')
const createIridium = require('iridium-sbd')

function messageSent(err, momsn) {
  if (err) return console.error(err)
  return console.log('SBD Msg Sent', momsn)
}

function sendMsg(iridium) {
  const maxWait = 25000
  return message => iridium.sendBinaryMessage({ message, maxWait }, messageSent)
}

const handleRingAlert = iridium => () => {
  console.log('New incoming message event!')
  iridium.mailboxCheck(console.log)
}
function handleMessage(message, queued) {
  console.log('Received new message ', queued, message)
}

const start = _.curry((app, { device }) => {
  const iridium = createIridium()
  app.ref.set('iridium', iridium)
  iridium.on('debug', app.debug)

  // /dev/cu.usbserial
  iridium.open({
    debug: 1, // turn debugging on
    port: device, // /dev/cu.usbserial
    flowControl: false, // Set to false to disable flowControl on the SBD for 3-wire UART setups.
  })
  iridium.on('initialized', () => {
    console.log('Iridium initialized')
    app.ref.set('iridium.ready', true)
    app.ref.set('sendMessage', sendMsg(iridium))
  })
  iridium.on('ringalert', handleRingAlert(iridium))
  iridium.on('newmessage', handleMessage)
  return Promise.resolve()
})

const stop = (app) => {
  const closed = () => console.log('iridium closed')
  app.ref.method('iridium.close', [closed])
}
module.exports = {
  startIridium: start,
  stopIridium: stop,
}
