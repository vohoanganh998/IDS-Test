import userService from "./user";

const apiFactory = {
  user: new userService(),
};

export default apiFactory;
