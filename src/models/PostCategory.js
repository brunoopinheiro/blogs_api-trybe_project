/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: { type: DataTypes.INTEGER, foreignKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(
      models.BlogPost,
      {
        as: 'blogPosts',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      },
    );
    models.BlogPost.belongsToMany(
      models.Category,
      {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      },
    );
  };

  return PostCategory;
};