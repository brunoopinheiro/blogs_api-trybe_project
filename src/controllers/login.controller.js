const { userService } = require('../services');
const { validateLogin } = require('./utils/validateLogin');

module.exports = async (req, res) => {
  const { error: validationError } = validateLogin(req.body);

  if (validationError) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { email, password } = req.body;
  const { error: serviceError, token } = await userService.login(email, password);

  if (serviceError && serviceError.code === 'invalidFields') {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({ token });
};
