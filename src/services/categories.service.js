const { Category } = require('../models');

async function createCategory({ name }) {
  const newCategory = await Category.create({ name });

  return newCategory;
}

async function getCategories() {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });

  return categories;
}

module.exports = {
  createCategory,
  getCategories,
};