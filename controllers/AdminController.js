const AdminModel = require("../models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class AdminController {
  /**
   * Find one admin by id
   */
  async index(req, res) {
    const { email, password } = req.body;
    try {
      const admin = await AdminModel.findOne({ email });

      await bcrypt.compare(password, admin.password);
      admin.password = "";

      res.send({ admin });
    } catch (err) {
      console.log(err);
    }
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name || typeof name !== "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }

    if (!email || typeof email !== "string") {
      return res.json({ status: "error", error: "Invalid email" });
    }

    if (!password || typeof password !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }

    if (password.length < 5) {
      return res.json({
        status: "error",
        error: "Password too small. Should be at least 6 charaters.",
      });
    }

    if (password.length > 15) {
      return res.json({
        status: "error",
        error: "Password too large. It must be a maximum of 15 characters.",
      });
    }

    try {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        await AdminModel.create({ name, email, password: hash });
      });

      res.json({ status: "OK" });
    } catch (err) {
      if (err.code === 11000) {
        return res.json({ status: "error", error: "Username already in use." });
      }
      throw err;
    }
  }
}

module.exports = new AdminController();
