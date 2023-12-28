const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')



router.post('/create',orderController.createOrder);
router.get('/user/:id',orderController.fetchUserAllOrders)
      .get('/' ,orderController.fetchAllFilterOrders)
      .patch('/update/:id', orderController.updateOrder);

module.exports = router;