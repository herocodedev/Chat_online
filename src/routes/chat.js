var express = require('express')
var router = express.Router()

const chatControllers = require('../app/controllers/ChatControllers')

router.get('/', chatControllers.show)

module.exports = router