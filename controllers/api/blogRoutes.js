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
router.put('/:id', async (req, res) => {
    try {
        const blogData = await Blog.update(
        {
            where: {
                id: req.params.id
            }
        },
        {
            blog_title: req.body.blog_title,
            blog_content: req.body.blog_content
        }
        );
        
        if (!blogData) {
            res.status(404).json({ message: 'Error: Check your input and id' });
            return;
        }
        
        res.status(200).json(blogData);
        
    } catch {
        res.status(400).json(err);
    }
});

// Deletes the Blog in the DB
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        if (!blogData) {
            res.status(404).json({ message: 'Blog not found with that id' });
            return;
        }
        
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;