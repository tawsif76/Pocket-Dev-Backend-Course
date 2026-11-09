import express from 'express';
import blogRouter from './blog.js';

const app = express()

app.use(express.json())

app.use('/posts', blogRouter);


app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
