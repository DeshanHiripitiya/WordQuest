const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register user
exports.register_user = async (req, res) => {
  let { email, password, ...rest } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'user already registered please sign in' }] });
    }

    const newUser = await User.create({
      email,
      password: hashedPassword,
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
    console.log(password, '===', user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    // console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

//get users
exports.get_all_users = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//update user
exports.edit_user = async (req, res) => {
  try {
    const { firstname, lastname, phone_number, email } = req.body;
    const id = req.params.id;

    const updateUser = await User.update(
      {
        firstname,
        lastname,
        phone_number,
        email,
      },
      { where: { id } }
    );

    if (!updateUser[0]) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.json('user updated');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error updating word' });
  }
};

//delete user
exports.delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const delUser = await User.destroy({ where: { id } });

    if (!delUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.status(200).json('user deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
