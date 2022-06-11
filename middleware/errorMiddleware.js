const { CustomErrorAPI } = require("../errors/CustomErrorAPI")

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ errorMessage: err.message })
  }
  return res.status(500).json({ errorMessage: "Server Error" });
}

module.exports = { errorMiddleware }