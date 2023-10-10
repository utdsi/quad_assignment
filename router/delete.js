


const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Delete a user by user_id
router.delete('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.destroy({ where: { user_id } });

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
