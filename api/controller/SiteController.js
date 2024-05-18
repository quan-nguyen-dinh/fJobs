const nodemailer = require("nodemailer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateSecretKey } = require("../helper");
const crypto = require("crypto");

class SiteController {
  async sendVerificationEmail(email, verificationToken) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sujananand0@gmail.com",
        pass: "rnzcugnscqtqiefs",
      },
    });

    const mailOptions = {
      from: "linkedin@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `please click the following link to verify your email : ${REACT_APP_DEV_MODE}/verify/${verificationToken}`,
    };

    //send the mail
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.log("Error sending the verification email");
    }
  }
  // [POST] /register
  async register(req, res) {
    //endpoint to register a user in the backend
    try {
      const { name, email, password, profileImage } = req.body;
      console.log("userinfo: ", name, email, profileImage);
      //check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered");
        return res.status(400).json({ message: "Email already registered" });
      }

      //create a new User
      const newUser = new User({
        name,
        email,
        password,
        profileImage,
      });

      //generate the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");

      //save the user to the database
      await newUser.save();

      //send the verification email to the registered user
      this.sendVerificationEmail(newUser.email, newUser.verificationToken);

      res.status(202).json({
        message:
          "Registration successful.Please check your mail for verification",
      });
    } catch (error) {
      console.log("Error registering user", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }

  // [GET] /verify/:token
  async verify(req, res) {
    try {
      const token = req.params.token;

      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }

      //mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;

      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email verification failed" });
    }
  }

  // [POST] /login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      //check if user exists already
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      //check if password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const secretKey = generateSecretKey();
      const token = jwt.sign({ userId: user._id }, secretKey);

      res.status(200).json({ token });
    } catch (error) {
      console.log('error: ', error);
      res.status(500).json({ message: "Login failed" });
    }
  }
}

module.exports = new SiteController();
