import test from 'ava'

import { mixin } from '../src'

const Test1Mixin = {
  test () {
    return 'test 1'
  }
}

const Test2Mixin = {
  test () {
    return 'test 2'
  }
}

test('mixin containing a function should be merged on class prototype', t => {
  @mixin(Test1Mixin)
  class Test { }

  const testInstance = new Test()
  t.is(testInstance.test(), 'test 1')
})

test('mixin containing a string property should be merged on class prototype', t => {
  const TestMixin = {
    test: 'test mixin'
  }

  @mixin(TestMixin)
  class Test { }

  const testInstance = new Test()
  t.is(testInstance.test, 'test mixin')
})

test('apply multiple mixins should returns the last mixin function value', t => {
  @mixin(Test1Mixin, Test2Mixin)
  class Test { }

  const testInstance = new Test()
  t.is(testInstance.test(), 'test 2')
})

test('apply a mixin containing a function already existing on class prototype should returns class method', t => {
  @mixin(Test1Mixin)
  class Test {
    test () {
      return 'test class'
    }
  }

  const testInstance = new Test()
  t.is(testInstance.test(), 'test class')
})

test('apply multiple mixins and call function should trigger all mixins and class methods', t => {
  const Test1Mixin = {
    test () {
      return ++this.counter
    }
  }

  const Test2Mixin = Test1Mixin

  @mixin(Test1Mixin, Test2Mixin)
  class Test {
    constructor () {
      this.counter = 0
    }

    test () {
      return ++this.counter
    }
  }

  const testInstance = new Test()
  t.is(testInstance.test(), 3)
})

test(`mixin function returns same context as class instance`, t => {
  const TestMixin = {
    test () {
      return this
    }
  }

  @mixin(TestMixin)
  class Test { }

  const testInstance = new Test()
  t.is(testInstance.test(), testInstance)
})

test('use mixin decorator without at least one mixin argument throws a syntax error', t => {
  const error = t.throws(() => {
    @mixin
    class Test { } // eslint-disable-line
  }, SyntaxError)

  t.is(error.message, `@mixin decorator 'Test' requires at least one mixin`)
})
