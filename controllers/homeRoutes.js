const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });


    const blogDataClear = BlogData.map((Blog) => Blog.get({ plain: true }));
    res.render('homepage', {
      blogDataClear,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });


    const blogDataClear = BlogData.map((Blog) => Blog.get({ plain: true }));
    res.render('dashboard', {
      blogDataClear,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;