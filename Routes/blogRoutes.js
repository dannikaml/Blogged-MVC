const router = require('express').Router();
const { Blog, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const postDataClean = blogData.get({ plain: true });

    res.render('blog', {
      ...postDataClean,
      logged_in: req.session.logged_in,
      blogDataClear: postDataClean.Comments // pass the comments data to the template
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


router.delete('/blogs/:id', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
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

router.post('/blogs/:id/comments', withAuth, async (req, res) => {
  try {
    const { comment_text } = req.body;

    if (!comment_text || comment_text.trim() === '') {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const user_id  = 3;
    const blog_id = req.params.id;
    console.log(blog_id);
    Comment.create({ comment_text, user_id, blog_id });

    // Redirect the user back to the blog post page with the updated comments
    res.redirect(`/dashboard`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.delete('/comments/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    // Redirect the user back to the homepage with the updated post and comments
    res.redirect('/');

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
