import State from '../state'

class WhichRoom {
  constructor(proxyService) {
    this.proxyService = proxyService
    this.state = State.WHICH_ROOM
  }

  shouldExecute(messageService) {
    if (
      messageService.getCurrentState() === this.state &&
      // Check so that commands get preference
      !messageService.getCommand()
    ) {
      return true
    }
    return false
  }

  execute(messageService) {
    let reply
    let state = State.NONE
    const index = messageService.getMessage()
    const assets = this.proxyService.getAssets()
    if (!messageService.isInt() || index < 1 || index > assets.length) {
      reply = `Index: ${index} is out of range. Please enter an integer between 1 and ${assets.length}`
      state = this.state
    } else {
      // Subtract one to account for 0 based indexing
      const asset = assets[parseInt(index, 10) - 1].getAsset()
      this.proxyService.createRoom(asset)
    }
    const obj = {
      reply,
      state,
    }
    return obj
  }
}

export default WhichRoom