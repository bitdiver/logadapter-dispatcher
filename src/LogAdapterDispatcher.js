'use strict'

export default class LogAdapterDispatcher {
  constructor(opts = {}) {
    this.logAdapterList = opts.logAdapterList
  }
  async log(logMessage) {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      const promisses = []
      for (const logger of this.logAdapterList) {
        promisses.push(
          logger.log(logMessage).catch(err => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
        )
      }

      return Promise.all(promisses)
    }
  }

  reset() {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      for (const logger of this.logAdapterList) {
        logger.reset()
      }
    }
  }
}
