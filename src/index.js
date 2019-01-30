import LogAdapterDispatcher from './LogAdapterDispatcher'

// Stores the logger instance
let logAdapter

/**
 * returns the logAdapter
 */
function getLogAdapter(opts) {
  if (logAdapter === undefined) {
    logAdapter = new LogAdapterDispatcher(opts)
  }
  return logAdapter
}

export { getLogAdapter, LogAdapterDispatcher }
