import { addTodo, getTodosByUser, deleteTodoByUser } from "../Services/todoService.js";

export const addTodoController = async (req, res) => {
    const { text } = req.body ?? {};

    if (typeof text !== "string" || !text.trim()) {
        return res.status(400).json({
            message: "Todo text must be a non-empty string",
        });
    }

    try {
        const todo = await addTodo(req.userID, text.trim());
        return res.status(201).json({ todo });
    } catch (error) {
        console.error("Failed to save todo:", error);
        return res.status(500).json({ message: "Could not save todo" });
    }
};

export const listTodo = async (req, res) => {
    try {
        const todos = await getTodosByUser(req.userID);
        return res.status(200).json({ todos });
    } catch (error) {
        console.error("Failed to list todos:", error);
        return res.status(500).json({ message: "Could not load todos" });
    }
};

export const deleTodo = async (req, res) => {
    try {
        const deleted = await deleteTodoByUser(req.userID, req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Failed to delete todo:", error);
        return res.status(500).json({ message: "Could not delete todo" });
    }
};
