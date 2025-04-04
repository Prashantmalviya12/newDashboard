const controller = require('../controller/Auth-controller')
const router = require('express').Router()

router.post('/',controller.login)

module.exports = router