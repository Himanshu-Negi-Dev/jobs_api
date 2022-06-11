const login = (req, res) => {
  res.send('hello login');
}

const register = (req, res) => {
  res.send('hello redister')
}

module.exports = { login, register }