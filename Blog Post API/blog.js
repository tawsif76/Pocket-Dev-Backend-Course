import { Router } from "express";
import Joi from "joi";
import sanitizeHtml from "sanitize-html";

let nextId = 1;
const posts = [];

const sanitize = (text) =>
    sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }).trim();

class BlogPost {
    constructor({ title, content, author }) {
        this.title = sanitize(title);
        this.content = sanitize(content);
        this.author = sanitize(author);
        this.id = nextId++;
        this.createdAt = new Date();
    }
}

const blogSchema = Joi.object({
    title: Joi.string().trim().min(3).required(),
    content: Joi.string().trim().min(10).required(),
    author: Joi.string().trim().required(),
}).required();

const router = Router();

router.post('/', (req, res) => {
    const {error, value} = blogSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }

    const blog = new BlogPost(value);
    
    posts.push(blog);
    res.status(201).json({
        message: "Blog created Successfully",
        blog
    })
})

router.get('/:id', (req, res) => {
    const blogId = Number(req.params.id);
    // console.log(typeof(blogId));
    const post = posts.find((p) => p.id === blogId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
})

export default router;