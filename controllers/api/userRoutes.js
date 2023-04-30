// signup/login/logout
const router = require('express').Router()
const User = require('../../models/User')

// sign up
router.post('/', async (req, res) => {
    try {
        // Creates the new user data.
        const userData = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true
            req.session.username = req.body.username
            
            res.status(200).json(userData)
        })
        // Problems with the server/connection
    } catch (err) {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async (req, res) => {
    try { 
        // Check Username
    const userData = await User.findOne({ where: { username: req.body.username } })
    if (!userData) {
        res.status(400).json({ message: 'Incorrect username or password!'})
        return
    }
    // Check Password to the username
    const validPassword = await userData.checkPassword(req.body.password)
    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password!'})
        return
    }
    // Login is successful
    req.session.save(() => {
        req.session.user_id = userData.id,
        req.session.logged_in = true
        req.session.username = req.body.username

        res.json({ user: userData, message: 'You are now logged in'})
    })
    // Other problems with the server / connection
    } catch (err) {
        res.status(500).json(err)
    }
})

// logout
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router