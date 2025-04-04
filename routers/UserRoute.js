const controller = require('../controller/User-controller')
const router = require('express').Router()

router.post('/',controller.addUser)
router.get('/',controller.getAllUsers)
router.get('/:id',controller.getUserById)
router.put('/:id',controller.updateUser)
router.delete('/:id',controller.deleteUser)

module.exports = router