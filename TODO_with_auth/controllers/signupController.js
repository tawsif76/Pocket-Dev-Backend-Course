import validator from 'validator';
import { pushUser } from '../Services/userInfo.js';

export const signup = async (req, res) => {
    const {userName, password} = req.body
    console.log(password);
    if (typeof password !== "string" || password.length === 0) {
        return res.status(400).json({
            message: "Password must be a non-empty string"
        });
    }

    const isValid = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });

    if (!isValid) {
        return res.status(400).json({
        message:
            "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a symbol.",
        });
    }

    try {
        await pushUser(userName, password);
        return res.status(201).json({
            message: "User created Successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Could not register user",
        });
    }

}