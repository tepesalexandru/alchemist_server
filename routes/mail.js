const router = require("express").Router();
const cors = require("cors");
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");

router.use(cors({
    credentials: true
}))

// Body Parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post("/send", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_PROVIDER,
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'myAlchemist: A new user has joined',
        text: 'A new user has become an alchemist.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Email sent");
        }
      });
})

module.exports = router;