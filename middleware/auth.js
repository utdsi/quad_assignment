


const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth= (req, res, next) => {
  const token = req.header.authorization

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


module.exports = {auth}
