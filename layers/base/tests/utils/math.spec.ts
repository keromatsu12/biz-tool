import { describe, it, expect } from 'vitest'
import { sum } from '../../app/utils/math'

describe('Math Utils', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
