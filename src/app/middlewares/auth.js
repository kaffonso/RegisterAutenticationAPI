const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token Not Provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts === 2) {
    return res.status(401).json({ error: 'Token Error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer/i.test(scheme)) {
    return res.status(401).json({ error: 'Token Malformatted' })
  }

  jwt.verify(token, authConfig.secret, (err, decoded)=>{
    if (err) return res.status(401).json({ error:'Token Invalid'})

    req.userId = decoded.id
    return next()
  })
}