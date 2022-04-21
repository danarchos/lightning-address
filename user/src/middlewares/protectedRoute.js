const axios = require("axios");
const jwt = require("jsonwebtoken")

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }


    const token = req.headers.authorization.replace("Bearer", "").trim();
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    } catch (err) {
        console.log({ err });
        next({
            message: "You need to be logged in to visit this route",
            statusCode: 403,
        });
    }
};
