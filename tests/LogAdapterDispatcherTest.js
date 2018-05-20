import { LogAdapterDispatcher, getLogAdapter } from '../lib/index'

test('create a new LogAdapterDispatcher', async done => {
  const logAdapter = getLogAdapter()
  expect(logAdapter).not.toBeNull()
  logAdapter.reset()
  done()
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter reset', async done => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  logAdapter.log('a')
  logAdapter.log('b')
  logAdapter.reset()

  expect(logger1.messages).toEqual([])
  expect(logger2.messages).toEqual([])

  done()
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter reset', async done => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  logAdapter.log('a')
  logAdapter.log('b')

  expect(logger1.messages).toEqual(['a', 'b'])
  expect(logger2.messages).toEqual(['a', 'b'])

  done()
})

class DemoAdapter {
  constructor(opts = {}) {
    this.name = opts.name
    this.messages = []
  }
  log(logMessage) {
    this.messages.push(logMessage)
  }
  reset() {
    this.messages = []
  }
}
