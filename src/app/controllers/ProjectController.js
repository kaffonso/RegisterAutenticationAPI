const User = require('../models/user')

module.exports = {
  async main(req, res) {
    const userID = req.userId

    const user = await User.findOne({_id : req.userId})

    res.json([{ ok: "Logged Sucessfully" }, {user}])
  }
}