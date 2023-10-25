
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in first" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in first" });
        }
        const { _id } = payload;
        User.findById(_id)
            .then(userdata => {
                if (!userdata) {
                    return res.status(401).json({ error: "User not found" });
                }
                req.user = userdata;
                next();
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            });
    });
};
