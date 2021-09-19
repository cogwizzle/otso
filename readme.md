# Otso CLI

Otso is a CLI for organizing all of your shared scripts and shortcuts so other developers can use them as well.  They can be project specific or more broad.

## Getting started.
In order to install Otso you can run the command:
```sh
npm install -g cogwizzle/otso
```
Now just run the command
```
otso
```
That is it you're up and running.

## Writing plugins
To extend the functionlity of Otso you can create your own plugins.  Plugins allow you to add a wide range of functionality to Otso.  Below are the steps to creating a plugin.
1. Create a folder with the name `otso-*nameOfPlugin*`.
1. Inside of your new plugin folder add the `commands` directory.
1. Next run `npm init`.
1. Inside of the `commands` directory add the following file:
```javascript
// myCommand.js
const command = {
  name: 'my command',
  description: 'My Command',
  run: async toolbox => {
    const {
      print: { info },
    } = toolbox

    info('My first plugin!!!')
  }
}

module.exports = command
```
For more information on how to create a customize a plugin check out the [Gluegun documentation](https://infinitered.github.io/gluegun/#/tutorial-making-a-plugin).

## Configuration - .otsorc
Otso plugins may have some configuration settings that can be stored in a .otsorc file.  This configuration can be stored at the project level or you can store it at the user's profile level.  .otsorc files are written in a JSON format.  The base install for Otso does not require any custom configuration.

# License
MIT - see LICENSE

