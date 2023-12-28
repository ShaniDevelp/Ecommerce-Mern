const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')



router.post('/', productController.CreateProduct)
      .get('/', productController.fetchAllFilterProducts);

router.get('/:id', productController.fetchSingleProduct);
router.patch('/:id', productController.updateProduct);
      


 
module.exports = router;