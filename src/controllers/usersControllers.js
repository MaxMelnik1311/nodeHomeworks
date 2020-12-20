const AuthService = require("../services/authService");
const UsersService = require("../services/usersService");
const isEmailValid = require("../validation/user");
const serviceUser = new UsersService();
const serviceAuth = new AuthService();

const reg = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await serviceUser.findByEmail(email);
  if (user) {
    return next({
      status: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  if (!isEmailValid(email)) {
    return next({
      status: 400,
      message: "Wrong email - it must be like email@gmail.com",
    });
  }
  try {
    const newUser = await serviceUser.create({ email, password, subscription });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        password: newUser.password,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await serviceAuth.login({ email, password });
    if (token) {
      const user = await serviceUser.findByEmail(email);
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          token,
          user: { email, subscription: user.subscription },
        },
      });
    }
    next({
      status: 401,
      message: "Email or password is wrong",
    });
  } catch (e) {
    next(e);
  }
};

const currentUser = async (req, res, next) => {
  const token = req.user.token;
  try {
    const user = await serviceUser.findByToken(token);
    if (user) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          email: user.email,
          subscription: user.subscription,
          token: user.token,
        },
      });
    }
    next({
      status: 401,
      message: "You are not authorized!",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res.status(204).json({ status: "success", code: 204 });
};

module.exports = {
  reg,
  login,
  currentUser,
  logout,
};
