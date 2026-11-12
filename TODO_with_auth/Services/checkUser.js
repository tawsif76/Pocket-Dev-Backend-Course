import bcrypt from 'bcrypt';
import fs from 'fs';

const filePath = new URL("../user.json", import.meta.url);

export const checkUser = async (userName, password) => {
    let users;

    try {
        const data = await fs.promises.readFile(filePath, "utf8");
        users = JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;        
    }

    const user = users.find((user) => user.userName === userName);

    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) return null;

    return user.userID;

};