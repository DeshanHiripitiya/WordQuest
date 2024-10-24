const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register user
exports.register_user = async (req, res) => {
  let { email,password, ...rest } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    let user = await User.findOne({
      where: { email, },
    });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'user already registered please sign in' }] });
    }

    const newUser = await User.create({
      email,
      password : hashedPassword,
      ...rest,
    });

    res.send(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//login user
exports.login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }
    console.log(password, "===",user.password);
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

//get users

