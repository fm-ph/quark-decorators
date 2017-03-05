/**
 * Mixin decorator.
 * @function mixin
 *
 * @license {@link https://opensource.org/licenses/MIT|MIT}
 *
 * @author Patrick Heng <hengpatrick.pro@gmail.com>
 * @author Fabien Motte <contact@fabienmotte.com>
 *
 * @param {...Object} mixins Mixin(s).
 *
 * @throws {SyntaxError} Mixin decorator requires at least one mixin.
 *
 * @returns {function} Wrapped target class.
 */
export default function mixin (...mixins) {
  if (typeof mixins[0] === 'function') {
    throw new SyntaxError(`@mixin decorator '${mixins[0].name}' requires at least one mixin`)
  }

  // Return wrapped target class
  return function ({ prototype }) {
    const mergedFunctions = {}

    // Parse mixins
    for (const mixin of mixins) {
      for (const key in mixin) {
        const prop = mixin[key]

        if (typeof prop === 'function') {
          mergedFunctions[key] = mergedFunctions[key] || []
          mergedFunctions[key].push(prop)
        } else {
          prototype[key] = prop
        }
      }
    }

    // Rewrite prototype function
    for (const key in mergedFunctions) {
      const functions = mergedFunctions[key]
      const defaultFn = prototype[key]

      prototype[key] = function (...args) {
        let result

        for (const fn of functions) {
          result = fn.apply(this, args)
        }

        if (typeof defaultFn === 'function') {
          result = defaultFn.apply(this, args)
        }

        return result
      }
    }
  }
}
