const express = require('express');
const { checkLoggedIn } = require('../../middleware/auth');
let router = express.Router();
require('dotenv').config();

const { User } = require('../../models/user_model');

router.route("/register")
.post( async (req,res)=>{
    try {
        ///1 check if email taken
        if (await User.emailTaken(req.body.email)) {
            return res.status(400).json({ message: 'Sorry email taken' })
        }

        /// 2 creating the model ( hash password)
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        /// 3 generate token
        const token = user.generateToken();
        const doc = await user.save();

        // 4 send email

        // save...send token with cookie
        res.cookie('x-access-token', token)
            .status(200).send(getUserProps(doc));
    } catch (error) {
        res.status(400).json({ message: 'Error', error: error })
    }
})

router.route("/sign-in")
.post( async (req,res)=>{
    try {
        // FIND USER
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({message:'Bad email'});

        // COMPARE PASSWORD
        const compare = await user.comparePassword(req.body.password);
        if(!compare) return res.status(400).json({message:'Bad Password'});

        // GENERATE TOKEN
        const token = user.generateToken();
        
        // RESPONSE
        res.cookie('x-access-token',token)
        .status(200).send(getUserProps(user));
    } catch(error) {

    }
})

router.route("/profile")
.get(checkLoggedIn, async (req,res)=>{
    console.log(req.user);
    res.status(200).send('ok');
})

const getUserProps = (user) => {
    return {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        role: user.role
    }
}


module.exports = router;