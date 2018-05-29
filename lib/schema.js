const schema = {
  type: 'object',
  properties: {
    device: {
      type: 'string',
      title: 'Device Path',
      description: 'Example: /dev/ttyUSB0',
    },
    updateMinutes: {
      type: 'number',
      title: 'Send Message Rate (Minutes)',
      default: 60,
    },
  },
}

module.exports = schema
