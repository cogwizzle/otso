const command = {
  name: 'otso',
  description: 'A tool for organiztion your tools.',
  run: async toolbox => {
    const {
      print: { info, table },
      meta: { version, commandInfo }
    } = toolbox

    info('Welcome to otso CLI')
    info(`v ${version()}`)
    table(commandInfo())
  }
}

module.exports = command
