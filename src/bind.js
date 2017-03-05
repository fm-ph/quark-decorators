/**
 * Bind decorator.
 * @function bind
 *
 * @license {@link https://opensource.org/licenses/MIT|MIT}
 *
 * @author Patrick Heng <hengpatrick.pro@gmail.com>
 * @author Fabien Motte <contact@fabienmotte.com>
 *
 * @param {Object} target Target.
 * @param {string} key Target key.
 * @param {Object} descriptor Descriptor for the target being modified.
 * @param {function} descriptor.value Value.
 * @param {function} descriptor.configurable Configurable.
 * @param {function} descriptor.enumerable Enumerable.
 *
 * @throws {SyntaxError} Bind decorator can only be applied to a method.
 *
 * @returns {function} Bound function.
 */
export default function bind (target, key, descriptor) {
  if (typeof descriptor === 'undefined' || typeof descriptor.value !== 'function') {
    throw new SyntaxError(`@bind decorator can only be applied to a method`)
  }

  const { value: fn, configurable, enumerable } = descriptor

  return {
    configurable,
    enumerable,
    get () {
      // Property prototype direct access
      if (this === target) {
        return fn
      }

      const boundFn = fn.bind(this)

      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      })

      return boundFn
    }
  }
}
