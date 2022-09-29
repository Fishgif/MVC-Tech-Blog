const {User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

const router = require('express').Router()

router.get('/signup', (req, res) => {

  res.render('signup');

});

router.post('/signup', async (req, res) => {
  
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/login');
    });
  

});

router.get('/', async (req, res) => {

  const models  = await Post.findAll({
    order: [
      ['created_at', 'DESC']
    ],
    include: [
      {
        model: User,
      }
    ]
  });

  const posts = models.map((post) => post.get({plain: true}));
  res.render("home", {
    logged_in: req.session.logged_in,
    posts: posts,
  });


});


router.post('/posts', withAuth, async (req, res) => {


  await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  });


  res.redirect('/dashboard');

})

router.get('/posts/new', withAuth, (req, res) => {

  res.render('newpost', {
    logged_in: req.session.logged_in,

  });
})

router.post('/posts/:id/comments', withAuth,  async (req, res) => {

  // create a new comment

  const comment = await Comment.create({
    body: req.body.content,
    user_id: req.session.user_id,
    post_id: req.params.id,
  });

  res.redirect('/posts/' + req.params.id);

})

router.get('/posts/:id', withAuth, async (req, res) => {


  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User
      },
      {
        model: Comment,
        order: [
          Comment, 'createdAt', 'ASC'
        ],
        include: [
          {
            model: User
          }
        ]
      }
    ],
    

  });
  const payload = post.get({plain: true});

  console.log(payload);

  res.render("post", {
    logged_in: req.session.logged_in,
    post: payload,
  });
})


router.get('/dashboard', withAuth, async (req, res) => {

  const models = (await Post.findAll({
    order: [
      ['created_at', 'DESC']
    ],
    include: [
      {
        model: User,
      }
    ]
  }))


  const posts = models.map((post) => post.get({plain: true}));
  console.log(posts);

  res.render('dashboard', {
    logged_in: req.session.logged_in,
    posts,

  })

});

module.exports = router;