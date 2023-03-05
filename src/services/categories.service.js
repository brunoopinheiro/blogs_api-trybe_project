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

async function verifyCategoriesById(categoryIds) {
  const categories = await Category.findAll({ attributes: ['id'] });
  const allCatIds = categories.map((cat) => cat.dataValues.id);

  const verificationList = categoryIds.map((c) => allCatIds.includes(c));

  return verificationList.every((i) => i === true);
}

module.exports = {
  createCategory,
  getCategories,
  verifyCategoriesById,
};