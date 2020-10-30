var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');

/* GET home page. Add redirection to Signup, or Dashboard if logged iN*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
}
)

router.post("/signup", async (req, res, next) => {
  // validamos los datos que vienen del formulario
  if (req.body.email === "" || req.body.password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up",
    });
    return;
  }

  // desestructuramos el email y el password de req.body
  const { email, password } = req.body;

  // creamos la salt y hacemos hash del password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  try {
    // buscar el usuario por el campo email
    const user = await User.findOne({ email: email });
    // si existiera en la base de datos, renderizamos la vista de auth/signup con un mensaje de error
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists!",
      });
      return;
    }

    await User.create({
      email,
      password: hashPass,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});


module.exports = router;
