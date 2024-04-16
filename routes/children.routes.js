const Router = require('express')
const router = new Router()
const childrenController=require('../controller/children.controller')

router.post('/children', childrenController.createChild)
router.get('/children', childrenController.getChildrenByUser)

module.exports = router