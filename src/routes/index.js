const chatRouter = require('./chat')

function route(app) {
    app.use('/', chatRouter)
}

module.exports = route