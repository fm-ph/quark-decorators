import test from 'ava'

import { bind } from '../src'

test('bind a class method', t => {
  class Test {
    @bind
    test () {
      return this
    }
  }

  const testInstance = new Test()
  const { test } = testInstance
  t.is(test(), testInstance)
})

test('bind a class throws a syntax error', t => {
  const error = t.throws(() => {
    @bind
    class Test {} // eslint-disable-line
  }, SyntaxError)

  t.is(error.message, '@bind decorator can only be applied to a method')
})

test('property prototype access does not return the bound method', t => {
  class Test {
    @bind
    test () {
      return this
    }
  }

  const testInstance = new Test()
  const { test } = testInstance
  t.not(Test.prototype.test, test)
})
