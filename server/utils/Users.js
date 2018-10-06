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
    const user = this.getUser(id);
    if (!user) {
      return;
    }

    this.users = this.users.filter(user => user.id !== id);

    return user;
  }

  list(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = {
  Users,
};
