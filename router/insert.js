


const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Insert a new user
router.post('/', async (req, res) => {
  const { user_name, user_email, user_password, user_image, total_orders } = req.body;

  try {
    // Check if user_email is already taken
    const existingUser = await User.findOne({ where: { user_email } });

    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const newUser = await User.create({
      user_name,
      user_email,
      user_password,
      user_image,
      total_orders,
    });

    res.json({ msg: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
