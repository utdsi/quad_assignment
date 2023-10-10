


const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Update user details
router.put('/', async (req, res) => {
  const { user_id, ...newDetails } = req.body;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.update(newDetails, { where: { user_id } });

    res.json({ msg: 'User details updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
