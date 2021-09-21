const { build } = require('gluegun')
const { promisify } = require('util')
const path = require('path')
const exec = promisify(require('child_process').exec)
const { cosmiconfig } = require('cosmiconfig')
const homedir = require('os').homedir()

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  const globalModules = path.resolve(
    (await exec('npm config get prefix')).stdout.replace('\n', '').trim() +
      '/node_modules'
  )
  const explorer = cosmiconfig('otso')
  const local = await explorer.search(process.cwd())
  const global = await explorer.search(homedir)
  const config = {
    ...(local && local.config),
    ...(global && global.config)
  }
  // create a CLI runtime
  const cli = build()
    .brand('otso')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'otso-*', hidden: false })
    .plugins(globalModules, {
      matching: 'otso-*',
      hidden: false
    })
    .plugins('./node_modules', { matching: '*/otso-*', hidden: false })
    .plugins(globalModules, {
      matching: '*/otso-*',
      hidden: false
    })
    .help() // provides default for help, , --help, -h
    .version() // provides default for version, v, --version, -v
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
