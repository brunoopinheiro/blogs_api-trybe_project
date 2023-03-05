const { userService } = require('../services');
const { validateUserBody } = require('./utils/validateUserBody');

const createUser = async (req, res) => {
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
};

module.exports = {
  createUser,
};