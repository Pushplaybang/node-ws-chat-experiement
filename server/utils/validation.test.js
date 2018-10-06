const expect = require('expect');
const { isString } = require('./validation');

describe('isString validation', () => {
  it('should accept real strings', () => {
    var result = isString('hi, I am a real string');

    expect(result).toBe(true);
  });

  it('should reject empty strings', () => {
    var resultNothing = isString(null);
    var resultEmptyString = isString('   ');

    expect(resultNothing).toBe(false);
    expect(resultEmptyString).toBe(false);
  });

  it('should reject invalid values', () => {
    var result = isString(1234567);

    expect(result).toBe(false);
  })
});