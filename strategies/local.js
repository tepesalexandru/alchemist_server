const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");


module.exports = (passport) => {
    // Configure the local strategy (email and password)
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
        })
    );

    // Serialize User
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    
    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });

}