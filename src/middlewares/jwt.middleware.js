import jwt from 'jsonwebtoken';
import User from '../features/user/user.model.js';

const jwtAuth = async (req, res, next) => {
    // 1. Read the token from the header
    const token = req.headers['authorization']?.split(" ")[1];

    // 2. if no token, return the error.
    if (!token) {
        return res.status(401).json('Unauthorized');
    }
    // 3. Check if token is valid
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
    }
    catch(err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    // 4. call next middleware
    next();
}

export default jwtAuth;