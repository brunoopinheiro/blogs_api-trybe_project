const { postService, categoryService } = require('../services');
const { validatePostBody, validateUpdatePostBody } = require('./utils/validatePostBody');

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

const getPosts = async (_req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(post);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updatePostById = async (req, res) => {
  try {
    const { error: validationError } = validateUpdatePostBody(req.body);
    if (validationError) {
      return res.status(400).send({ message: 'Some required fields are missing' });
    }

    const { id: postId } = req.params;
    const { id: userId } = req.user;

    const oldPost = await postService.getPostById(postId);
    if (oldPost.userId !== userId) {
      return res.status(401).send({ message: 'Unauthorized user' });
    }

    const updatedPost = await postService.updatePost(postId, req.body);
    return res.status(200).json(updatedPost);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
};