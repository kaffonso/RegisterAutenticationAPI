const mongo = require('../../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongo.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function (next) {
  this.password  = await bcrypt.hash(this.password, 10)

  next()
})

const User = mongo.model('User', UserSchema)
module.exports = User