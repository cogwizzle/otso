const spawn = require('child_process').spawn

const command = {
  name: 'alert',
  description: 'Run command and audibly alert me when it completes.',
  alias: ['a'],
  run: async toolbox => {
    const {
      print: { info, error, success },
      system: { run },
      parameters
    } = toolbox

    const onExit = () => {
      success('Task complete!')
      if (process.platform === 'win32') {
        run(`rundll32 user32.dll,MessageBeep -MB_ICONEXCLAMATION`)
      } else {
        console.log('\u0007')
      }
    }

    info('We will alert you when your process completes with a sound.')
    const output = spawn(parameters.string, {
      shell: process.platform === 'win32'
    })
    output.stdout.on('data', data => {
      info(`${data}`)
    })

    output.stderr.on('data', data => {
      error(` ${data}`)
    })

    output.on('close', code => {
      onExit()
    })
  }
}

module.exports = command
