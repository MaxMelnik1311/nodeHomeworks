const UsersRepository = require("../repository/userRepository");
const ErrorHandler = require("../helpers/errorHandler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
require("dotenv").config();

class UserService {
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findByToken(token) {
    const data = await this.repositories.users.findByToken(token);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async updateAvatar(id, pathFile) {
    try {
      const {
        secure_url: avatar,
        public_id: idCloudAvatar,
      } = await this.uploadCloud(pathFile);
      const oldAvatar = await this.repositories.users.getAvatar(id);
      this.cloudinary.uploader.destroy(
        oldAvatar.idCloudAvatar,
        (err, result) => {
          console.log(err, result);
        }
      );
      await this.repositories.users.updateAvatar(id, avatar, idCloudAvatar);
      await fs.unlink(pathFile);
      return avatar;
    } catch (err) {
      throw new ErrorHandler(null, "Error upload avatar");
    }
  }

  uploadCloud(pathFile) {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        {
          folder: "avatarsHW5",
          transformation: {
            width: 500,
            crop: "fill",
          },
        },
        (error, result) => {
          console.log(result);
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  }
}

module.exports = UserService;
