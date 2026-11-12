import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

const SECRET = process.env.JWT_SECRET;


export const generateToken = (userId) => {
    return jwt.sign(
        {sub: userId},
        SECRET,
        {algorithm: "HS256", expiresIn: "1h", jwtid: randomUUID()}
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET, { algorithms: ["HS256"] });
}
