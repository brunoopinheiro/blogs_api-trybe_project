const { postService, categoryService } = require('../services');
const { validatePostBody } = require('./utils/validatePostBody');

const createPost = async (req, res) => {
  try {
    const { error: validationError } = validatePostBody(req.body);
    if (validationError) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const { categoryIds } = req.body;

    const validCategories = await categoryService.verifyCategoriesById(categoryIds);
    if (validCategories === false) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const { id } = req.user;
    const { title, content } = req.body;
    const post = await postService.createPost({ userId: id, title, content, categoryIds });

    return res.status(201).json(post);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createPost,
};