import fs from "fs";

const filePath = new URL("../revokedTokens.json", import.meta.url);
let pendingOperation = Promise.resolve();

const readRevocations = async () => {
    try {
        return JSON.parse(await fs.promises.readFile(filePath, "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
    }
};

export const isTokenRevoked = (tokenID) => {
    const operation = pendingOperation.then(async () => {
        const entries = await readRevocations();
        return entries.some((entry) => entry.jti === tokenID);
    });

    pendingOperation = operation.catch(() => {});
    return operation;
};

export const revokeToken = (tokenID, expiresAt) => {
    const operation = pendingOperation.then(async () => {
        const entries = await readRevocations();
        const now = Math.floor(Date.now() / 1000);
        // Expired JWTs already fail verification, so their entries can be removed.
        const activeEntries = entries.filter((entry) => entry.exp > now);

        if (!activeEntries.some((entry) => entry.jti === tokenID)) {
            activeEntries.push({ jti: tokenID, exp: expiresAt });
        }

        await fs.promises.writeFile(filePath, JSON.stringify(activeEntries, null, 2), "utf8");
    });

    pendingOperation = operation.catch(() => {});
    return operation;
};
