import { verifyToken } from "../Services/tokenService.js";
import { isTokenRevoked } from "../Services/logoutService.js";

export const authMiddleware = async (req, res, next) => {
    const authorization = req.get("Authorization");
    const [scheme, token] = authorization?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    let payload;
    try {
        payload = verifyToken(token);

        if (
            typeof payload.sub !== "string" || !payload.sub ||
            typeof payload.jti !== "string" || !payload.jti ||
            !Number.isFinite(payload.exp)
        ) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        req.userID = payload.sub; //avialable to next controller
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }

    try {
        if (await isTokenRevoked(payload.jti)) {
            return res.status(401).json({ message: "Token has been logged out" });
        }
    } catch (error) {
        console.error("Failed to check token revocation:", error);
        return res.status(500).json({ message: "Could not authenticate request" });
    }

    req.tokenID = payload.jti;
    req.tokenExpiresAt = payload.exp;
    next();
}
