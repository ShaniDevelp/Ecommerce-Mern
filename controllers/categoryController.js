const Category = require('../models/categoryModel')
const asynchandler = require("express-async-handler");


exports.fetchCategories = asynchandler(async(req, res, next)=>{
    try{
        const categories = await Category.find({}).exec();
        res.status(200).json(categories)
    } catch(error){
        res.status(400).json(error)
    }
});


exports.createCategory = asynchandler(async(req, res, next)=>{

    const category = new Category(req.body);
    try{
        await category.save()
        res.status(200).json(category)
    } catch(error){
        res.status(400).json(error)
    }
});