import bcrypt from "bcrypt";
import User from "./user.model.js";
import { isValidImageURL, getDefaultAvatar } from "../utils/file.utils.js";

class UserService {
  static async signup({ name, email, password, userPhoto }) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate image or assign default avatar from Iran Liara API
    let finalPhoto = userPhoto;
    if (!userPhoto) {
      finalPhoto = getDefaultAvatar(name); // Generate avatar using Iran Liara API
    } else if (!isValidImageURL(userPhoto)) {
      throw new Error("Invalid photo URL. Must be a .jpg, .jpeg, or .png link.");
    }

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, userPhoto: finalPhoto });
    return await newUser.save();
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }
}

export default UserService;
