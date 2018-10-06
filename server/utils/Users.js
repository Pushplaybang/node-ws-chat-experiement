class Users {
  constructor() {
    this.users = [];
  }

  addUser({id, name, room}) {
    this.users.push({id, name, room});
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id);
  }

  list(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = {
  Users,
};
