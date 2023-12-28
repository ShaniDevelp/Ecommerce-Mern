const asynchandler = require('express-async-handler');
const User = require('../models/userModel');



exports.findUserById = asynchandler(async(req, res, next)=>{
    const id = req.params.id
    console.log("Userid => ",id)
    try{
        const user = await User.findById(id);
        res.status(201).json({id: user.id, email:user.email, role: user.role, addresses: user.addresses})

    } catch(err){
        res.status(400).send(err)
    }
});

exports.updateUser = asynchandler(async(req, res, next)=> {

    const userId = req.params.id;
    const update = req.body
    try{
        const user = await User.findByIdAndUpdate(userId, update, {new: true});
        await user.save();
        res.status(200).send(user)
    } catch (err){
        res.status(400).send(err);
    }
})

