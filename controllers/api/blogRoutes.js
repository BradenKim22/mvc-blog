// Blog Post's, Update, and Delete
const router = require('express').Router();
const Blog = require('../../models/Blog');
const withAuth = require('../../utils/auth');

// Posts the Blog to the DB
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Updates the Blog in the DB


// Deletes the Blog in the DB

module.exports = router;