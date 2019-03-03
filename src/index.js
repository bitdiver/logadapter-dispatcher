import LogAdapterDispatcher from './LogAdapterDispatcher'

// Stores the logger instance
let logAdapter

/**
 * returns the logAdapter
 */
function getLogAdapterDispatcher(opts) {
  if (logAdapter === undefined) {
    logAdapter = new LogAdapterDispatcher(opts)
  }
  return logAdapter
}

export { getLogAdapterDispatcher, LogAdapterDispatcher }
