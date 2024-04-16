const Router = require('express')
const router = new Router()
const userController=require('../controller/user.controller')

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/user/:user_id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:user_id', userController.deleteUser)


module.exports = router