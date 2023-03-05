const { Category } = require('../models');

async function createCategory({ name }) {
  const newCategory = await Category.create({ name });

  return newCategory;
}

module.exports = {
  createCategory,
};