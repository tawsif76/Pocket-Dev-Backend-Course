import { checkUser } from "../Services/checkUser.js";
import { generateToken } from "../Services/tokenService.js";

export const login = async (req, res) => {
    const {userName, password} = req.body;

    if (
        typeof userName !== "string" || !userName ||
        typeof password !== "string" || !password
    ) {
        return res.status(400).json({
        message: "Username and password are required",
        });
    }

    try {
        const userId = await checkUser(userName, password);
        if (!userId) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        const token = generateToken(userId);

        return res.status(200).json({
            message: "Login successful",
            token,
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
        message: "Could not log in",
        });
    }

}