const { categoryService } = require('../services');
const { validateCategoryBody } = require('./utils/validateCategoryBody');

const createCategory = async (req, res) => {
  try {
    const { error: validationError } = validateCategoryBody(req.body);
    if (validationError) return res.status(400).json({ message: validationError.message });

    const newCategory = await categoryService.createCategory(req.body);

    return res.status(201).json(newCategory);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createCategory,
};