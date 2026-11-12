import express from 'express';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import todoRouter from './routes/todos.js';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/todos', todoRouter);

app.listen(5050, () => console.log("server is running on port 5050"));
