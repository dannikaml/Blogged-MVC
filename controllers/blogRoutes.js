const router = require('express').Router();
const { blog, User } = require('../models');


const withAuth = require('../utils/auth');

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await blog.findByPk(req.params.id, {
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
    res.render('newPostForm')
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/blog', withAuth, async (req, res) => {
  try {
    const newBlog = await blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Redirect to user's blog post dashboard upon successful submission
    res.redirect('/dashboard');

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/blog', withAuth, async (req, res) => {
  try {
    const deletedBlog = await blog.destroy({
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
