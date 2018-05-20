'use strict'

export class LogAdapterDispatcher {
  constructor(opts = {}) {
    this.logAdapterList = opts.logAdapterList
  }
  log(logMessage) {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      for (const logger of this.logAdapterList) {
        logger.log(logMessage)
      }
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

// Stores the logger instance
let logAdapter

/**
 * returns the logAdapter
 */
export function getLogAdapter(opts) {
  if (logAdapter === undefined) {
    logAdapter = new LogAdapterDispatcher(opts)
  }
  return logAdapter
}
