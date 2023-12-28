const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController')



router.get('/',brandController.fetchBrands );
router.post('/create',brandController.createBrand );


module.exports = router;