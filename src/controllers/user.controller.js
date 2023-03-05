const { userService } = require('../services');
const { validateUserBody } = require('./utils/validateUserBody');

const createUser = async (req, res) => {
  try {
    const { error: validationError } = validateUserBody(req.body);
    if (validationError) return res.status(400).json({ message: validationError.message });
  
    const newUser = await userService.createUser(req.body);
  
    if (newUser.error) {
      const { status, message } = newUser.error;
      return res.status(status).send({ message });
    } 
  
    const { email, password } = req.body;
    const { token } = await userService.login(email, password);
  
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getByUserId(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getByUserId,
};