const Order = require('../models/orderModel')
const asynchandler = require("express-async-handler");

exports.createOrder = asynchandler(async(req, res, next)=> {
    console.log(req.body)
    const order = new Order(req.body);
    try{
        await order.save();
        res.status(200).json(order);

    } catch (err) {
        res.status(400).send(err);
    }
});

exports.fetchUserAllOrders = asynchandler(async(req, res, next)=> {
    const userId = req.params.id;
    console.log("ID For Orders ==>", req.user )
    try{
        const orders = await Order.find({user: userId}).exec();
        console.log(orders)
        res.status(200).send(orders)

    } catch(err){
        res.status(400).send(err);
    }
});

exports.fetchAllFilterOrders = asynchandler(async(req, res, next) => {

    let query = Order.find({});
    let totalOrdersQuery = Order.find({});

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]: req.query._order});
        totalOrdersQuery = totalOrdersQuery.sort({[req.query._sort]: req.query._order});
    }
    const totalDocs = await totalOrdersQuery.count().exec();

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

exports.updateOrder = asynchandler(async(req, res, next) => {
    const id = req.params.id;
    const update = req.body;

    try{
        const response = await Order.findByIdAndUpdate(id, update, {new: true});
        await response.save();
        res.status(200).send(response);

    } catch (err){
        res.status(400).send9err
    }
})