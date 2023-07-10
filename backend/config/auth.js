const jwt = require ('jsonwebtoken');

const verifytoken = (req, res , next) => {
    try {
           
        //    console.log(req.headers.authorization);
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1] , '123456789RA');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
};

module.exports = verifytoken;