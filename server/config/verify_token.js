const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "token is not valid" });

        req.user = user;
        next();
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  verifyToken,
};
