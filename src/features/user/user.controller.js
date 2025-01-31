import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController {

    async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            const newUser = await UserModel.signup(name, email, password);
            res.status(201).send(newUser);
        }
        catch (err) {
            res.status(400).send('Error in adding user');
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.login(email, password);

            if (!user) return res.status(401).json({ message: "Invalid credentials" });
            // Create token
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // Send token in response
            res.status(200).send(token);
        }
        catch (err) {
            res.status(400).send('Error in login');
        }
    }
}