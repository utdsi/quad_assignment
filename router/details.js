

// routes/details.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Get user details by user_id
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
