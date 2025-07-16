const User = require('../models/User');

exports.getAll = async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id, '-password');
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

exports.create = async (req, res) => {
  const { username, password, name, role } = req.body;
  if (!username || !password || !name) return res.status(400).json({ error: 'All fields required' });
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ error: 'Username already exists' });
  const user = new User({ username, password, name, role: role || 'user' });
  await user.save();
  res.status(201).json({ message: 'User created', user: { username: user.username, name: user.name, role: user.role, _id: user._id } });
};

exports.update = async (req, res) => {
  const { name, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role },
    { new: true, select: '-password' }
  );
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

exports.remove = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
}; 