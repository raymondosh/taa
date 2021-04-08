import db from "..";

export default class UserRepository {
  static async createUser(user) {
    await db.users.add(user);
    return this.getUserByEmail(user.email);
  }

  static async getUserByEmail(email) {
    return await db.users
      .where({
        email,
      })
      .first();
  }
}
