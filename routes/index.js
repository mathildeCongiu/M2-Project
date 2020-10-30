var express = require('express');
var router = express.Router();

/* GET home page. Add redirection to Signup, or Dashboard if logged iN*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
}
)

module.exports = router;
