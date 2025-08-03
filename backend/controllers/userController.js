const User = require('../models/user');

const searchUsers = async (req, res) => {
  try {
    const query = req.query.query || '';
    if (!query) return res.json([]);

    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    }).select('_id username');

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { searchUsers };
