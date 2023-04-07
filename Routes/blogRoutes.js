const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const postDataClean = blogData.get({ plain: true });

    res.render('blog', {
      ...postDataClean,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/new', withAuth, async (req, res) => {
  try {
    res.status(200)
    res.render('blogPostForm')
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/blogs', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Redirect to user's job dashboard upon successful submission
    res.redirect('/dashboard');

  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/blogs', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.body.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedBlog) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
