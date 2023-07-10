const User = require('../models/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async(req, res) => {
    try {
        let data = req.body;
        let user = new User(data);
        salt=bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(data.password,salt);
        let savedUser = await user.save();
        res.status(200).send(savedUser);
    } 
    catch (err) {
        res.status(500).send(err.message);
    }
}





const login = async(req, res) => {
    try {
            let {email ,password} = req.body;
            let user = await User.findOne({email :email});
        if (!user) {
            res.status(404).send("invalid email or password");
        }
            let validpassword = bcrypt.compareSync(password , user.password);
        if (!validpassword) {
            res.status(404).send("Invalid email or password");
        }
            let payload = {
                name : user.name,
                lastname : user.lastname,
                email : user.email,
                _id: user._id
            }
            let token = jwt.sign(payload, '123456789RA');
            res.status(200).send({mytoken : token});
        }
    catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = {
    register,
    login
}