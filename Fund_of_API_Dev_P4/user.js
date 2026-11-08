import { Router } from 'express';

const router = Router();

class User {
    constructor({name, age, address}) {
        this.name = name
        this.age = age
        this.address = address
    }
}
router.get('/:id', (req, res) => {
    const userID = req.params.id;
    const filter = req.query.filter;

    res.status(200).send(`User Id: ${userID}, Filter: ${filter}`)
})

router.post('/', (req, res) => {
    const user = new User(req.body)
    res.status(201).json({
        message: "Users created successfully",
        user
    })
})

export default router;