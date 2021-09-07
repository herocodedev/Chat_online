class ChatControllers {
    show(req, res, next) {
        res.render('index')
    }
}
module.exports = new ChatControllers()