// Comment Routes
const router = require('express').Router()
const { Comment } = require('../../models/Comment')
const withAuth = require('../../utils/auth')

// Post Comment to DB
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            contents: req.body.contents,
            // date_created: req.body.date_created,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        })
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router