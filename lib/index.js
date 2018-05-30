const wrapPlugin = require('signalk-plugin-state')
const { decodeMessage } = require('signalk-sbd-msg')
const schema = require('./schema')
const start = require('./start')
const { stopIridium } = require('./iridium')

function initPlugin(app) {
  console.log('SBD INIT')
  return {
    id: 'sbd',
    name: 'Iridium Short Burst Data',
    description: 'Send Iridium SBD (Short Burst Data). Use with RockBlock or Iridium 9602 modems.',
    schema,
    start: start(app),
    stop: stopIridium(app),
    // uiSchema,
  }
}
const plugin = wrapPlugin(initPlugin)
plugin.decodeMessage = decodeMessage
module.exports = plugin
