const iridium = require('iridium-sbd')

const start = _.curry((app, { device, updateMinutes }) => {
  iridium.open({
    debug: 1, // turn debugging on
    port: device, // /dev/cu.usbserial
    flowControl: false, // Set to false to disable flowControl on the SBD for 3-wire UART setups.
  })
  iridium.on('debug', app.debug)

  return Promise.resolve()
})

module.exports = start
