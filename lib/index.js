const wrapPlugin = require('signalk-plugin-state')
const schema = require('./schema')
const start = require('./start')

// STOP.
const stop = () => null

function initPlugin(app) {
  console.log('SBD INIT')
  return {
    id: 'sbd',
    name: 'Iridium Short Burst Data',
    description: 'Send Iridium SBD (Short Burst Data). Use with RockBlock or Iridium 9602 modems.',
    schema,
    start: start(app),
    stop,
    // uiSchema,
  }
}

module.exports = wrapPlugin(initPlugin)
