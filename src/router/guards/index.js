// Import Store
import store from "../../store";

// Create function to check if user is Authenticated
export const isAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    return next();
  }
  return next({
    path: "/auth/login",
    query: {
      redirect: to.fullPath,
    },
  });
};

// Create function to check if user is not Authenticated
export const isNotAuthenticated = (to, from, next) => {
  if (!store.getters["auth/isAuthenticated"]) {
    return next();
  }
  return next({
    name: "home",
  });
};
