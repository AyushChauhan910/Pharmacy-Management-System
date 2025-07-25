const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({
    token,
    user: { name: user.name, username: user.username, role: user.role }
  });
};

exports.register = async (req, res) => {
  const { username, password, name, role } = req.body;
  if (!username || !password || !name) return res.status(400).json({ error: 'All fields required' });
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ error: 'Username already exists' });
  let userRole = 'user';
  if (role && req.user && req.user.role === 'admin') {
    userRole = role;
  }
  const user = new User({ username, password, name, role: userRole });
  await user.save();
  res.status(201).json({ message: 'User registered', user: { username: user.username, name: user.name, role: user.role } });
}; 