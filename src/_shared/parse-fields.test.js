import parseFields from '_shared/parse-fields'

test('parseFields', () => {
  expect(parseFields({})).toEqual({})
  expect(parseFields({ a: '' })).toEqual({})
  expect(parseFields({ a: 'a' })).toEqual({ a: 'a' })

  expect(parseFields({ a: '0' }, { integer: 'a' })).toEqual({ a: 0 })
  expect(parseFields({ a: '1' }, { integer: 'a' })).toEqual({ a: 1 })
  expect(parseFields({ a: '1' }, { integer: ['a'] })).toEqual({ a: 1 })
  expect(() => parseFields({ a: 'x' }, { integer: 'a' })).toThrow(
    "Value 'x' of integer field 'a' is not an integer.",
  )

  expect(parseFields({ a: 'on' }, { toggle: 'a' })).toEqual({ a: true })
  expect(parseFields({ a: 'on' }, { toggle: ['a'] })).toEqual({ a: true })
  expect(parseFields({}, { toggle: 'a' })).toEqual({})
  expect(() => parseFields({ a: 'x' }, { toggle: 'a' })).toThrow(
    "Value 'x' of toggle field 'a' is not 'on'.",
  )

  expect(
    parseFields(
      { name: 'Sven', lastName: '', age: '30', isCool: 'on' },
      { integer: ['age'], toggle: ['isCool', 'isFun'] },
    ),
  ).toEqual({ name: 'Sven', age: 30, isCool: true })
})
