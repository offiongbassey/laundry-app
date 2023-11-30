import jwt from 'jsonwebtoken';

export const jwtVerification = (token) => {
    try {
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    return verification;
    } catch (error) {
    console.log("here is the error", error);
    return { id: 0, iat: 0}
    }
    
}

export const generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET);
}