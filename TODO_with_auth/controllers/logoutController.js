import { revokeToken } from "../Services/logoutService.js";

export const logout = async (req, res) => {
    try {
        await revokeToken(req.tokenID, req.tokenExpiresAt);
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout failed:", error);
        return res.status(500).json({ message: "Could not log out" });
    }
};
