const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')




router.get('/own/:id',userController.findUserById );
router.patch('/update/:id',userController.updateUser );


module.exports = router;