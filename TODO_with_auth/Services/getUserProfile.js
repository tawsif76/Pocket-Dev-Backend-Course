import fs from "fs";

const filePath = new URL("../user.json", import.meta.url);

export const getUserProfile = async (userID) => {
    let users;

    try {
        const data = await fs.promises.readFile(filePath, "utf8");
        users = JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;
    }

    const user = users.find((user) => user.userID === userID);

    if (!user) return null;
    return {
        userID: user.userID,
        userName: user.userName,
    };
};
