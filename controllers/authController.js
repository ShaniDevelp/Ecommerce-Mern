const asynchandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY";


exports.createUser = asynchandler(async (req, res, next) => {

    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',
            async function (err, hashedPassword) {
                const user = new User({ ...req.body, password: hashedPassword, salt })
                const doc = await user.save();
                req.logIn({ id: doc.id, role: doc.role }, (err) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        const token = jwt.sign({ id: doc.id, role: doc.role }, SECRET_KEY);
                        res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json({token});
                    }
                })

            });
    } catch (err) {
        res.status(400).json(err);
    }
});


exports.logInUser = asynchandler(async (req, res, next) => {
    console.log("req.user.token  => ",req.user )
    const user = {
        token : req.user.token,
        id: req.user.id
    }
    const token = req.user.token
    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(user);
});

exports.checkUser = asynchandler(async (req, res, next) => {
    res.json(req.user.id)
});