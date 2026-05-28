const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')
const auth = require('../middleware/auth')

router.get('/', postController.getAll)
router.get('/:id', postController.getById)

router.post('/', auth, postController.create)       
router.put('/:id', auth, postController.update)     
router.delete('/:id', auth, postController.delete)  

module.exports = router