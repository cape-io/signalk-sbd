const _ = require('lodash/fp')
const createIridium = require('iridium-sbd')
const { hexBuff } = require('./buildMsg')

const iridium = createIridium()

function close() {
  const closed = () => console.log('iridium closed')
  iridium.close(closed)
}

function sendMsg() {
  function sent(arg) {
    console.log('msg sent', arg)
    return _.delay(500, close)
  }
  const message = hexBuff('c293e7a14214f63768178f7979c7')
  const maxWait = 25000
  // close()
  iridium.sendBinaryMessage({ message, maxWait }, sent)
}

iridium.on('initialized', () => {
  console.log('Iridium initialized')
  return _.delay(500, sendMsg)
})

iridium.open({
  debug: 1, // turn debugging on
  port: '/dev/cu.usbserial', //
  flowControl: false, // Set to false to disable flowControl on the SBD for 3-wire UART setups.
})

iridium.on('debug', console.log)

iridium.on('ringalert', () => {
  console.log('New incoming message event!')
  iridium.mailboxCheck(console.log)
})

iridium.on('newmessage', (message, queued) => {
  console.log('Received new message ', queued, message)
})
