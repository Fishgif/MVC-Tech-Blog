const router = require('express').Router()


router.get('/', (req, res) => {

  // TODO: check if user is logged in 


  res.render("home", {
    logged_in: true,
  });


});
// Create routes for all as per brief
router.get('/dashboard', (req, res) => {

  // TODO: send back the view that contain all of my blog

})

module.exports = router;