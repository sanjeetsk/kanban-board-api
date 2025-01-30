import jwt from 'jsonwebtoken';

const jwtAuth = async (req, res, next) => {
    // 1. Read the token from the header
    const token = req.header['authorization'];

    // 2. if no token, return the error.
    if (!token) {
        return res.status(401).json('Unauthorized');
    }
    // 3. Check if token is valid
    try{
        const payload = jwt.verify(token, '29DEE4697BD14');
        req.user = payload;
    }
    catch(err){
        return res.status(401).json('Unauthorized');
    }
    // 4. call next middleware
    next();
}

export default jwtAuth;