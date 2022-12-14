import { describe, expect, it } from 'vitest'
import { testFunction } from '../src'

describe('nodesera', () => {
  const tests = [
    { input: 'foo', output: 'Hello foo' },
    { input: 'bar', output: 'Hello bar' }
  ]

  for (const test of tests) {
    it(test.input, () => {
      expect(testFunction(test.input)).eq(test.output)
    })
  }
})
