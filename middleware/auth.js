const jwt = require('jsonwebtoken');

const { CustomErrorAPI } = require("../errors/CustomErrorAPI");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new CustomErrorAPI('No token! authorization failed', 401);

  const token = authorization.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, email } = decode;
    req.user = { id, name, email }
    next();
  } catch (error) {
    throw new CustomErrorAPI(error.message, 401);    
  }
}

module.exports = { authMiddleware }