const { BlogPost, PostCategory } = require('../models');

async function createPost({ userId, title, content, categoryIds }) {
  const post = await BlogPost.create(
    { title, content, userId },
  );

  const bulkInsert = categoryIds.map((c) => ({ postId: post.id, categoryId: c }));
  await PostCategory.bulkCreate(
    bulkInsert,
    { validate: true },
  );

  return post;
}

module.exports = {
  createPost,
};