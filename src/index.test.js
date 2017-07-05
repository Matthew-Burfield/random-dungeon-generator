import NewDungeon from './index'

describe('NewDungeon with default settings', () => {
  const dungeon = NewDungeon()
  test('Creating a new dungeon returns an array by default', () => {
    expect(Array.isArray(dungeon)).toBe(true)
  })

  test('Creating new dungeon should default to array of length 50 by 50', () => {
    expect(dungeon.length).toBe(50)
    expect(dungeon[0].length).toBe(50)
  })
})


describe('NewDungeon with specific settings', () => {
  const dungeon = NewDungeon({ width: 15, height: 20 })

  test('should return dungeon of length 15 by 20', () => {
    expect(dungeon.length).toBe(20)
    expect(dungeon[0].length).toBe(15)
  })
})

