const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const userData = require('./userData');
const blogData = require('./blogData');
const commentData = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const createdUsers = await User.findAll();

  await Blog.bulkCreate(
    blogData.map((blog) => ({
      ...blog,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    }))
  );
  const createdBlogs = await Blog.findAll();

  await Comment.bulkCreate(
    commentData.map((comment) => ({
      ...comment,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
      blog_id: createdBlogs[Math.floor(Math.random() * createdBlogs.length)].id,
    }))
  );
};

seedDatabase();
