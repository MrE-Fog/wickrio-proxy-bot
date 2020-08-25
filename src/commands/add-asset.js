import State from '../state'
// import logger from '../logger'

// TODO use this instead of putting it in main!
class AddAsset {
  constructor(proxyService) {
    this.proxyService = proxyService
    this.commandString = '/asset'
  }

  shouldExecute(messageService) {
    if (messageService.getCommand() === this.commandString) {
      return true
    }
    return false
  }

  execute(messageService) {
    const argument = messageService.getArgument()
    let reply = `Asset ${argument}`
    if (argument === undefined || argument === '') {
      reply = 'Must have an asset to add. Usage: /asset <username>'
    } else {
      // TODO check for empty argument
      const added = this.proxyService.addAsset(argument)
      reply += added ? ' created' : ' already exists'
    }
    return {
      reply,
      state: State.NONE,
    }
  }
}

module.exports = AddAsset
