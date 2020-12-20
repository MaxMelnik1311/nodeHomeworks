const UsersRepository = require("../repository/userRepository");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!user || !validPassword {
      return null;
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await this.repositories.users.updateToken(id, token);
    return token;
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null);
    return data;
  }
}

module.exports = AuthService;
