const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please enter your Email and Password.",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (results.length <= 0) {
          return res.status(401).render("login", {
            message: "Please enter your Email and Password.",
          });
        } else {
          if ( !results || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).render("login", {
              message: "Incorrect Email or Password.",
            });
          } else {
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log("The token is " + token);
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("authenticationToken", token, cookieOptions);
            res.status(200).redirect("/profile");
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.signup = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.render("signup", {
          message: "This email is already registered.",
        });
      } else if (password != passwordConfirm) {
        return res.render("signup", {
          message: "Passwords do not match.",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("signup", {
              message: "User registered!",
            });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = (req, res, next) => {
  if (req.cookies.authenticationToken) {
    jwt.verify(
      req.cookies.authenticationToken,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          console.log(err);
          return next();
        }
        db.query(
          "SELECT * FROM users WHERE id=?",
          [decode.id],
          (error, results) => {
            if (error) {
              console.log(error);
              return next();
            }
            if (!results || results.length === 0) {
              return next();
            }
            req.user = results[0];
            return next();
          }
        );
      }
    );
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("authenticationToken", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
