import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader

  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
}
