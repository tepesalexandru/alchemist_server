const router = require("express").Router();
const authController = require("../controllers/authController");
const cors = require("cors");
const bodyParser = require("body-parser")
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// Cors
router.use(cors({
    credentials: true
}))

// Body Parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Express Session
router.use(session({secret: "Secret", resave: true, saveUninitialized: true}))

// Cookie Parser
router.use(cookieParser("Secret"));

// Passport
router.use(passport.initialize());
router.use(passport.session());
require("../strategies/local")(passport);
require("../strategies/facebook")(passport);
require("../strategies/google")(passport);

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        console.log(req.user);
        res.redirect("http://localhost:3000/");
    });

// Google Auth
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/google/callback",
    passport.authenticate("google"),
        (req, res) => {
            res.redirect("http://localhost:3000/");
        });

router.get("/logout", (req, res) => {
    console.log("logging out!");
    user = {};
    res.redirect("/");
})

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/user", authController.getUser);

module.exports = router;