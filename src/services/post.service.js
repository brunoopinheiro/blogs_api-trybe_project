const { BlogPost, PostCategory, User, Category } = require('../models');

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

async function getPosts() {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ],
  });

  return posts;
}

module.exports = {
  createPost,
  getPosts,
};