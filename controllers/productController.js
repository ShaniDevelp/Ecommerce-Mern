const Product = require('../models/productModel')
const asynchandler = require("express-async-handler");

exports.CreateProduct = asynchandler(async (req, res, next) => {

    try {
        const product = new Product(req.body)
        await product.save();
        res.status(201).send(product)

    }
    catch (error) {
        res.status(400).send(error);
    }

});

exports.fetchAllFilterProducts = asynchandler(async(req, res, next) => {

    let query = Product.find({});
    let totalProductsQuery = Product.find({});
    if(req.query.brand){
        query = query.find({brand: req.query.brand})
        totalProductsQuery = totalProductsQuery.find({brand: req.query.brand})
    }
    if(req.query.category){
        query = query.find({category: req.query.category})
        totalProductsQuery = totalProductsQuery.find({category: req.query.category})
    }
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]: req.query._order});
        totalProductsQuery = totalProductsQuery.sort({[req.query._sort]: req.query._order});
    }

    const totalDocs = await totalProductsQuery.count().exec();

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit
        const page = req.query._page
        query = query.skip(pageSize*(page-1)).limit(pageSize);
    }

    try{
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs)
        res.status(201).send(docs);

    } catch(error){
        res.status(400).json(error)
    }
});

exports.fetchSingleProduct = asynchandler(async (req, res, next) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id);
        res.status(201).send(product)
    }
    catch (error) {
        res.status(400).send(error);
    }

});

exports.updateProduct = asynchandler(async (req, res, next) => {
    const {id} = req.params
    const update = req.body
    try {
        const product = await Product.findByIdAndUpdate(id, update, {new : true});
        res.status(201).send(product)
    }
    catch (error) {
        res.status(400).send(error);
    }

});