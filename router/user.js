

// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/user');

// Authenticate user and get token
router.post('/', async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { user_email } });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if the password matches
    if (user_password === user.user_password) {
      const payload = {
        user: {
          id: user.user_id,
        },
      };

      jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } else {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
