import bcrypt from "bcrypt";
import crypto from 'crypto';
import fs from "fs";

const filePath = new URL("../user.json", import.meta.url);

export const pushUser = async (userName, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
//   console.log(hashedPassword);
  let users = [];

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    users = JSON.parse(data);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  users.push({
    userID: crypto.randomUUID(),
    userName,
    password: hashedPassword,
  });

  await fs.promises.writeFile(
    filePath,
    JSON.stringify(users, null, 2),
    "utf8"
  );
};