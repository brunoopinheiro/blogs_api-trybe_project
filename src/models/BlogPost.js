/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      tableName: 'blog_posts',
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      underscored: true,
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'users' },
    );
  };

  return BlogPost;
};