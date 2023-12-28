const Cart = require('../models/cartModel')
const asynchandler = require("express-async-handler");


exports.createCart = asynchandler(async(req, res, next)=> {
    console.log(req.body)
    const cart = new Cart(req.body);
    try{
        await cart.save();
        const result = await cart.populate('product');
        res.status(200).send(result);

    } catch (err) {
        res.status(400).send(err);
    }
});

exports.updateCart = asynchandler(async(req, res, next)=> {
    const cartId = req.params.id
    const update = req.body
    console.log(update)

    try{
        const cart = await Cart.findByIdAndUpdate(cartId, update, {new: true});
        await cart.save()
        const result = await cart.populate('product');
        res.status(200).send(result);

    } catch (err) {
        res.status(400).send(err);
    }
});

exports.deleteCart = asynchandler(async(req, res, next)=> {
    const cartId = req.params.id

    console.log(cartId)
    try{
        const cart = await Cart.findByIdAndDelete(cartId);
        res.status(200).send(cart);

    } catch (err) {
        res.status(400).send(err);
    }
});

exports.fetchUserAllCart = asynchandler(async(req, res, next)=> {
    const userId = req.params.id;
    console.log("Userid for cart => ",req.user)
    try{
        const cartItems = await Cart.find({user: userId}).populate('user').populate('product').exec();
        res.status(200).send(cartItems)

    } catch(err){
        res.status(400).send(err);
    }
})