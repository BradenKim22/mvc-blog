// This is where users Dashboard will be
const router = require('express').Router()
const { Blog, User } = require('../models')
const withAuth = require('../utils/auth')

// Get all routes created by the current user
router.get('/', withAuth, async (req, res) => {

    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            where: {
                user_id: req.session.user_id
            }
        })
        const Blogs = blogData.map((blog) => blog.get({ plain: true }))
        res.render('dashboard', { Blogs, logged_in: req.session.logged_in, username: req.session.username })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router