// home screen route
const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth')

// Render homepage with blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']

                },
            ],
        });

        const Blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { Blogs, logged_in: req.session.logged_in, username: req.session.username });

    } catch (err) {
        res.status(500).json(err)
    }
})

// Render login screen
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return
    }

    res.render('login')
})

// Render signup screen
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return
    }

    res.render('signup')
})

// Render one Blog by id
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User
                        }
                    ]
                }
            ]
        });

        const singleBlog = blogData.get({ plain: true });
        const blogCreator = singleBlog.user.username;
        const techUser = req.session.username;
        const userValidate = () => {
            if (blogCreator === techUser) {
                return true;
            } else {
                return false;
            }
        }

        // console.log('====================================');
        // console.log(singleBlog);
        // console.log('====================================');

        res.render('view-blog', { singleBlog, userValidate, logged_in: req.session.logged_in, username: req.session.username })
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get route to render 'create-blog' handlebars
router.get('/create-blog', withAuth, async (req, res) => {
    try { 
        res.render('create-blog', {
            logged_in: req.session.logged_in, username: req.session.username 
        });
    } catch (err) {
        res.status(500).json(err)
    }  
});

module.exports = router