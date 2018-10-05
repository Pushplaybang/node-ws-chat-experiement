const expect = require('expect');

const { generateMessage } = require('./message');

const testMessage = {
  from: 'test guy',
  text: 'heres a message',
};

describe('generate message', () => {
  it('should generate correct message object', () => {
    const { from, text } = testMessage;
    const message = generateMessage(from, text);
    console.log(message);
    expect(message).toMatchObject({ from, text, createdAt: expect.any(Number) });
  });
});
