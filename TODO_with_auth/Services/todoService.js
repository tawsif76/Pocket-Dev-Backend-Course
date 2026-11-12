import crypto from "crypto";
import fs from "fs";

const filePath = new URL("../todos.json", import.meta.url);
let pendingWrite = Promise.resolve();

const readTodos = async () => {
    try {
        const data = await fs.promises.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
    }
};

export const addTodo = (userID, text) => {
    // Keep reads and writes in order so simultaneous additions are preserved.
    const operation = pendingWrite.then(async () => {
        const todos = await readTodos();

        const todo = {
            id: crypto.randomUUID(),
            userId: userID,
            text,
            createdAt: new Date().toISOString(),
        };

        todos.push(todo);
        await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2), "utf8");
        return todo;
    });

    // A failed addition must not prevent later requests from trying again.
    pendingWrite = operation.catch(() => {}); //updating with latest promise
    return operation;
};

export const getTodosByUser = (userID) => {
    const operation = pendingWrite.then(async () => {
        const todos = await readTodos();
        return todos.filter((todo) => todo.userId === userID);
    });

    // Include reads in the chain so they cannot overlap a file write.
    pendingWrite = operation.catch(() => {});
    return operation;
};

export const deleteTodoByUser = (userID, todoID) => {
    const operation = pendingWrite.then(async () => {
        const todos = await readTodos();
        const index = todos.findIndex(
            (todo) => todo.id === todoID && todo.userId === userID
        );

        if (index === -1) return false;

        todos.splice(index, 1);
        await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2), "utf8");
        return true;
    });

    pendingWrite = operation.catch(() => {});
    return operation;
};
