const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const SQLiteStore = require('connect-sqlite3')(session);
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const productRouter = require('./routes/productRoutes');
const categoriesRouter = require('./routes/categoryRoutes');
const brandsRouter = require('./routes/brandsRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.MONGODB_URI)

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect("mongodb+srv://Admin:wWeNpL9qCSaya4DZ@cluster0.ilwkopa.mongodb.net/Ecommerce?retryWrites=true&w=majority");
    console.log('database connected')
}



function isAuth(req, res, done) {
    return passport.authenticate('jwt');
};

const SECRET_KEY = "SECRET_KEY";


const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};


const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

app.use(passport.authenticate('session'));
app.use(express.static('build'))


app.use(cors({
    exposedHeaders: ['X-Total-Count'],
}
));
app.use(express.json());

app.use('/products', productRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

passport.use('local', new LocalStrategy({ usernameField: 'email' },
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                done(null, false, { message: 'invalid credentials' })
            }
            else {
                crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',
                    async function (err, hashedPassword) {
                        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                            done(null, false, { message: 'invalid credentials' })
                        } else {
                            const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
                            const id = user.id
                            done(null, { token, id })
                            console.log("token =>", token)
                        }
                    })
            }
        } catch (err) {
            done(err)
        }
    }
));


passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload)
    try {
        const user = await User.findById(jwt_payload.id);

        if (user) {
            return done(null, { id: user.id, role: user.role });
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }
    catch (err) {
        return done(err, false);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            role: user.role
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


app.get('/', (req, res) => {
    res.send({ status: 'running' })
})

app.listen(3001, () => {
    console.log('server listening')
});