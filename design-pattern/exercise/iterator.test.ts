import { compare, Iterator } from './iterator'

describe('迭代器模式', () => {
  it('case 1', () => {
    const iterator1 = new Iterator([1, 2, 3])
    const iterator2 = new Iterator([1, 2, 3])
    expect(compare(iterator1, iterator2)).toBe(true)
  })
  it('case 2', () => {
    const iterator1 = new Iterator([1, 2, 4])
    const iterator2 = new Iterator([1, 2, 3])
    expect(() => {
      compare(iterator1, iterator2)
    }).toThrow(new Error('iterator1和iterator2不相等'))
  })
})
