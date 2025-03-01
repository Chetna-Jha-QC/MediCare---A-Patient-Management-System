const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticateUser = (req, res, next ) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ message: "Access Denied"});

    try{
        const decode = jwt.verify(token.replace("Bearer ", " "), process.env.JWT_SECRET);
    req.user = decoded;
next();
    } catch (error){
        res.send(403).json({ message: "Invalid Token"});
    }
};

module.exports = authenticateUser;