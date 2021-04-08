import db from "..";

export default class ImageRepository {
  // { userId: string, image: blob, location: string, title: string  }
  static async createImage(data) {
    const id = await db.images.add(data);
    return await db.images.get(id);
  }

  static async getImagesByUserId(userId) {
    return await db.images
      .where({
        userId,
      })
      .toArray();
  }
}
