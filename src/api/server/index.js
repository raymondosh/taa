import UserRepository from "./db/repositories/UserRepository.js";
import ImageRepository from "./db/repositories/ImageRepository";

class Server {
  constructor() {
    this.routes = {
      get: new Map(),
      post: new Map(),
    };
  }

  addRoute(method, route, handler) {
    const methodMap = this.routes[method.toLowerCase()];
    if (!methodMap) {
      throw new Error("method not supported");
    }
    methodMap.set(route, handler);
  }

  async call(method, route, body) {
    const [path, queryString] = route.split("?");

    const urlParams = new URLSearchParams(queryString || "");
    const query = Object.fromEntries(urlParams);

    const handler = this.routes[method.toLowerCase()].get(path);
    if (!handler) {
      throw new Error("route not found");
    }

    return await handler({ body, query });
  }
}

const server = new Server();

server.addRoute("post", "/api/register", async ({ body }) => {
  const { email, password } = body;
  const exisitingUser = await UserRepository.getUserByEmail(email);
  if (exisitingUser) {
    return {
      status: "error",
      message: "a user with this email already exists",
    };
  }
  const user = await UserRepository.createUser({ email, password });
  const token = btoa(user.email);
  return {
    status: "success",
    message: "registration successful",
    data: {
      user,
      token,
    },
  };
});

server.addRoute("post", "/api/login", async ({ body }) => {
  const { email, password } = body;
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    return {
      status: "error",
      message: "invalid login",
    };
  }

  if (user.password !== password) {
    return {
      status: "error",
      message: "invalid login",
    };
  }

  const token = btoa(user.email);
  return {
    status: "success",
    message: "login successful",
    data: {
      user,
      token,
    },
  };
});

server.addRoute("post", "/api/images", async ({ body, query }) => {
  const { token } = query;
  const { images } = body;

  const email = atob(token);
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    return {
      status: "error",
      message: "invalid token",
    };
  }

  for (const image of images) {
    await ImageRepository.createImage({
      title: image.title,
      location: image.location,
      image: image.image,
      userId: user.id,
    });
  }

  return {
    status: "success",
    message: "image upload successful",
    data: {},
  };
});

server.addRoute("get", "/api/images", async ({ query }) => {
  const { token } = query;

  const email = atob(token);
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    return {
      status: "error",
      message: "invalid token",
    };
  }

  const images = await ImageRepository.getImagesByUserId(user.id);

  return {
    status: "success",
    message: "images fetched",
    data: {
      images,
    },
  };
});

export default server;
