const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

const testMessage = {
  from: 'test guy',
  text: 'heres a message',
};

const testLocationMessage = {
  from: 'test guy',
  latitude: 1,
  longitude: 1,
};

describe('generate message', () => {
  it('should generate correct message object', () => {
    const { from, text } = testMessage;
    const message = generateMessage(from, text);

    expect(message).toMatchObject({ from, text, createdAt: expect.any(Number) });
  });
});

describe('generate location message', () => {
  it('should generate correct location message object', () => {
    const { from, latitude, longitude } = testLocationMessage;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message).toMatchObject({
      from,
      latitude: expect.any(Number),
      longitude: expect.any(Number),
      url: expect.any(String),
      createdAt: expect.any(Number) });
  });
});
