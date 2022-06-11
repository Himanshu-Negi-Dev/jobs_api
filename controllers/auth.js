const { asyncWrapper } = require("../middleware/async");

const login = asyncWrapper(async (req, res) => {
  res.send('hello login');
}) 


const register = asyncWrapper((req, res) => {
  res.send('hello redister')
}); 


module.exports = { login, register }