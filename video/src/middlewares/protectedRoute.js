const axios = require("axios");

exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({
      message: "You need to be logged in to visit this route",
      statusCode: 401,
    });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();
  try {
    const { data } = await axios.get(
      `${process.env.AUTH_API_BASE}/api/verifyDecodeUser?token=${token}`
    );

    req.decoded = data.decoded;
    next();
  } catch (err) {
    console.log({ err });
    next({
      message: "You need to be logged in to visit this route",
      statusCode: 403,
    });
  }
};
