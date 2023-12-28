const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')



router.get('/',categoryController.fetchCategories );
router.post('/create',categoryController.createCategory);


module.exports = router;