// Server.js
const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3000

// Create handlebars w/ custom helpers
const hbs = exphbs.create({ helpers })

// Session details
const sesh = {
    secret: "15 min session",
    cookie: {
        maxAge: 900000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

// Use the created session
app.use(session(sesh))

// Specify template engine (handlebars)
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join('public')))

// Routing
app.use(routes)

// Sync sequelize data, then start the server if successful
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
})