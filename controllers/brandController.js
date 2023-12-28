const Brand = require('../models/brandModel')
const asynchandler = require("express-async-handler");


exports.fetchBrands = asynchandler(async(req, res, next)=>{
    try{
        const brands = await Brand.find({}).exec();
        res.status(200).json(brands)
    } catch(error){
        res.status(400).json(error)
    }
});

exports.createBrand = asynchandler(async(req, res, next)=>{

    const brand = new Brand(req.body);
    try{
        await brand.save()
        res.status(200).json(brand)
    } catch(error){
        res.status(400).json(error)
    }
});