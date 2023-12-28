const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')



router.post('/',cartController.createCart);
router.get('/user/:id',cartController.fetchUserAllCart);
router.patch('/update/:id',cartController.updateCart);
router.delete('/delete/:id',cartController.deleteCart);


module.exports = router;