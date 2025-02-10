import UserService from "./user.service.js";
import jwt from "jsonwebtoken";

export default class UserController {
  async signup(req, res) {
    try {
      const { name, email, password, userPhoto } = req.body;
      const newUser = await UserService.signup({ name, email, password, userPhoto });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message || "Error in adding user" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create token
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ message: "Error in login" });
    }
  }
}


