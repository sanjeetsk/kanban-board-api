import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});


const User = mongoose.model('User', UserSchema);

export default class UserModel {

    static async signup(name, email, password){
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        return await newUser.save();
    }

    static async login(email, password){
        const user = await User.findOne({ email });
        if(!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }

}
