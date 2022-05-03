const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn
  })
}

module.exports = {
  async read(req, res) {
    const userList = await User.find();

    return res.send(userList)
  },

  async create(req, res) {
    const { name, email, password } = await req.body

    if (!(name || email || password)) {
      return res.status(401).json({
        error: 'Please Fill All The Fields'
      })
    }

    const findUser = await User.findOne({ email })

    if (findUser) {
      return res.status(400).json({
        error: 'User Already Exists'
      })
    }

    const userCreated = await User.create({
      name,
      email,
      password
    })

    userCreated.password = undefined

    return res.json([
      userCreated,
      { token: generateToken({ id: userCreated.id }) }])
  },

  async authenticate(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user || await !bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        error: 'Invalid Credentials'
      })
    }

    user.password = undefined

    return res.json([
      {
        OK: "Authentication Succeded"
      },
      {
        user
      },
      {
        token: generateToken({ id: user.id })
      }])
  }
} 