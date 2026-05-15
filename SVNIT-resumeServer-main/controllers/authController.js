import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { sendResetEmail } from '../utils/sendResetEmail.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const changePassword = async (req, res) => {
  const authHeader = req.headers.authorization;
  const { oldPassword, newPassword } = req.body;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    const userId = decoded.userId;

    const result = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
    { email: user.email, userId: user.id, name: user.name },
    JWT_SECRET,
    { expiresIn: '3d' }
    );

    console.log(token)
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

export const getProfile = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [decoded.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(result.rows[0])

    res.json(result.rows[0]);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


export const signup = async (req, res) => {
  console.log('Signup Body:', req.body);
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Connecting to DB at host:', process.env.PG_HOST);

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, name]
    );

    res.status(201).json({ message: 'User created', userId: result.rows[0].id });
  } catch (err) {
    console.error('Signup error:', err.stack || err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

  export const forgotPass = async(req,res) => { 
    const { email } = req.body;
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    try {
      await sendResetEmail(email, resetLink);
      console.log('aa');
      res.json({ message: 'Reset email sent successfully' });
    } catch (error) {
      console.error('Email send failed:', error);
      res.status(500).json({ message: 'Failed to send reset email' });
    }
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update in DB
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Password reset failed:', err);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};