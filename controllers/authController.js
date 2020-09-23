const User = require("../models/User");
const bcrypt = require('bcryptjs');
const passport = require("passport");

const authController = {
    async register(req, res) {
        User.findOne({
            username: req.body.username
        }, async (err, doc) => {
            if (err) throw err;
            // User exists
            if (doc) {
                console.log("User already exists");
                res.send("User already exists");
            // User doesn't exist
            } else {
                // hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                // create a new user
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword
                });
                // save the user to the database
                await newUser.save();
                
                res.send("User created");
            }
        })
    },
    async login(req, res, next) {
        passport.authenticate("local", (err, user) => {
            if (err) throw err;
            // User isn't registered
            if (!user) {
                console.log("This user doesn't exist");
                res.send("This user doesn't exist");
            } else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    console.log("Successfullu logged in!",req.user);
                    res.send("Successfully logged in!");
                })
            }
        })(req, res, next);
    },
    logout(req, res) {
        req.session.destroy(() => {
            // Destroy the session cookie
            res.clearCookie("connect.sid");
            res.redirect("/");
        })
    },
    // Get user information
    getUser(req, res) {
        console.log(req.user);
        res.send(req.user);
    }
}

module.exports = authController;