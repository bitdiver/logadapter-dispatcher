import { LogAdapterDispatcher, getLogAdapterDispatcher } from '../src/index'

test('create a new LogAdapterDispatcher', async () => {
  const logAdapter = getLogAdapterDispatcher()
  expect(logAdapter).not.toBeNull()
  logAdapter.reset()
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter set loglevel', async () => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  logAdapter.level = 3
  expect(logAdapter.level).toEqual(3)
  expect(logAdapter.levelNumber).toEqual(3)

  expect(logger1.level).toEqual(3)
  expect(logger2.level).toEqual(3)

  logAdapter.level = 1

  expect(logAdapter.level).toEqual(1)
  expect(logAdapter.levelNumber).toEqual(1)
  expect(logger1.level).toEqual(1)
  expect(logger2.level).toEqual(1)
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter reset', async () => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  await logAdapter.log('a')
  await logAdapter.log('b')
  logAdapter.reset()

  expect(logger1.messages).toEqual([])
  expect(logger2.messages).toEqual([])
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter reset', async () => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  await logAdapter.log('a')
  await logAdapter.log('b')

  expect(logger1.messages).toEqual(['a', 'b'])
  expect(logger2.messages).toEqual(['a', 'b'])
})

/*
 * Test that the reset will be executed for all the logger
 */
test('Logadapter with error', async () => {
  const logger1 = new DemoAdapter({ name: 'logger1' })
  const logger2 = new DemoAdapter({ name: 'logger2' })
  const logAdapter = new LogAdapterDispatcher({
    logAdapterList: [logger1, logger2],
  })

  await logAdapter.log('a')
  await logAdapter.log('b')
  await logAdapter.log('c')

  expect(logger1.messages).toEqual(['a', 'b'])
  expect(logger2.messages).toEqual(['a', 'b'])
})

class DemoAdapter {
  constructor(opts = {}) {
    this.name = opts.name
    this.messages = []
    this.level = 0
  }
  async log(logMessage) {
    if (logMessage === 'c') {
      throw new Error('This error is expected')
    }
    this.messages.push(logMessage)
  }

  // dummy implementation.
  get levelNumber() {
    return this.level
  }

  reset() {
    this.messages = []
  }
}
