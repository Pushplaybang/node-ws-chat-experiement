const expect = require('expect');

const { Users } = require('./Users');

let ChatUsers;
const demoUsers = [
  {
    id: 1,
    name: 'Paul',
    room: 'war room',
  },
  {
    id: 2,
    name: 'Jon',
    room: 'red room',
  },
  {
    id: 3,
    name: 'rob',
    room: 'war room',
  }
];

beforeEach(() => {
  ChatUsers = new Users();
  return demoUsers.forEach(user => ChatUsers.addUser(user));
});

describe('Users', () => {
  it('should create a user', () => {
    const ChatUsers = new Users();

    ChatUsers.addUser(demoUsers[0]);
    expect(ChatUsers.users).toEqual([demoUsers[0]]);
  });

  it('should find a user', () => {
    const user = ChatUsers.getUser(1);
    expect(user).toEqual(demoUsers[0]);
  });

  it('should not find a user that doesn\'t exist', () => {
    const user = ChatUsers.getUser(9);
    expect(user).toBeFalsy();
  });

  it('should remove a user', () => {
    ChatUsers.removeUser(3);
    expect(ChatUsers.users).not.toEqual(demoUsers);
  });

  it('should not remove a user that doesn\'t exist ', () => {
    ChatUsers.removeUser(999);
    expect(ChatUsers.users).toEqual(demoUsers);
  });

  it('should return the list of user in a room', () => {
    const roomUsers = ChatUsers.list('war room');
    expect(roomUsers).toEqual([demoUsers[0].name, demoUsers[2].name])
  });
});