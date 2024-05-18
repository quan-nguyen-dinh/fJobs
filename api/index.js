const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const db = require('./config/db');
const route = require("./routes");
require('dotenv').config();
const { Server } = require('socket.io');
const app = express();
const port = process.env.PORT;

app.use(cors());
db.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const http = require("http").Server(app);
const User = require("./models/user");
const Post = require("./models/post");
const MessageController = require("./controller/MessageController");
const Message = require("./models/message");
route(app);
const io = new Server(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat', (data)=>{
    console.log('----------------------------');
    console.log('data: ', data);
  })
  socket.on('push-comment', async (data) => {
    console.log('data: ', data);
    const loggedInuser = await User.findById(data.userId);
    console.log('UsersInfo: ', loggedInuser);
    socket.emit('comment', loggedInuser);
  });
  socket.on('send-message', async (data)=>{
    try{
      // console.log('req, ', req.body);
      const { senderId, recepientId, messageType, messageText } = data;
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        message: messageText,
        timestamp: new Date(),
        imageUrl: messageType === "image" ? req.file.path : null,
      });
      
      await newMessage.save();
      socket.broadcast.emit('receipt-message', data);
      // res.status(200).json({ message: "Message sent Successfully" });
    }catch(error) {
      console.error(error);
      // res.status(500).json({error: 'Post msg failed!'});
    }
   
  })

  //join room
  socket.on('join-room', key=>{
    socket.join(key);
  })
});

http.listen(port, () => {
  console.log("Server is running on port "+port);
});

//endpoint to register a user in the backend
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, profileImage } = req.body;
//     console.log('userinfo: ', name, email, profileImage);
//     //check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("Email already registered");
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     //create a new User
//     const newUser = new User({
//       name,
//       email,
//       password,
//       profileImage,
//     });

//     //generate the verification token
//     newUser.verificationToken = crypto.randomBytes(20).toString("hex");

//     //save the user to the database
//     await newUser.save();

//     //send the verification email to the registered user
//     sendVerificationEmail(newUser.email, newUser.verificationToken);

//     res.status(202).json({
//       message:
//         "Registration successful.Please check your mail for verification",
//     });
//   } catch (error) {
//     console.log("Error registering user", error);
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// const sendVerificationEmail = async (email, verificationToken) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sujananand0@gmail.com",
//       pass: "rnzcugnscqtqiefs",
//     },
//   });

//   const mailOptions = {
//     from: "linkedin@gmail.com",
//     to: email,
//     subject: "Email Verification",
//     text: `please click the following link to verify your email : ${REACT_APP_DEV_MODE}/verify/${verificationToken}`,
//   };

//   //send the mail
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Verification email sent successfully");
//   } catch (error) {
//     console.log("Error sending the verification email");
//   }
// };

//endpoint to verify email
// app.get("/verify/:token", async (req, res) => {
//   try {
//     const token = req.params.token;

//     const user = await User.findOne({ verificationToken: token });
//     if (!user) {
//       return res.status(404).json({ message: "Invalid verification token" });
//     }

//     //mark the user as verified
//     user.verified = true;
//     user.verificationToken = undefined;

//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Email verification failed" });
//   }
// });

// const generateSecretKey = () => {
//   const secretKey = crypto.randomBytes(32).toString("hex");

//   return secretKey;
// };

// const secretKey = generateSecretKey();

//endpoint to login a user.
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //check if user exists already
//     const user = await User.findOne({ email });
//     console.log('checklogin: ', user);
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     //check if password is correct
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign({ userId: user._id }, secretKey);

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

//user's profile
// app.get("/profile/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving user profile" });
//   }
// });

// app.get("/users/:userId", async (req, res) => {
//   try {
//     const loggedInUserId = req.params.userId;

//     //fetch the logged-in user's connections
//     const loggedInuser = await User.findById(loggedInUserId).populate(
//       "connections",
//       "_id"
//     );
//     if (!loggedInuser) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     //get the ID's of the connected users
//     const connectedUserIds = loggedInuser.connections.map(
//       (connection) => connection._id
//     );

//     //find the users who are not connected to the logged-in user Id
//     const users = await User.find({
//       _id: { $ne: loggedInUserId, $nin: connectedUserIds },
//     });

//     res.status(200).json(users);
//   } catch (error) {
//     console.log("Error retrieving users", error);
//     res.status(500).json({ message: "Error retrieving users" });
//   }
// });

//todo: send a connection request
// app.post("/connection-request", async (req, res) => {
//   try {
//     const { currentUserId, selectedUserId } = req.body;

//     await User.findByIdAndUpdate(selectedUserId, {
//       $push: { connectionRequests: currentUserId },
//     });

//     await User.findByIdAndUpdate(currentUserId, {
//       $push: { sentConnectionRequests: selectedUserId },
//     });

//     res.sendStatus(200);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating connection request" });
//   }
// });

//todo: endpoint to show all the connections requests
// app.get("/connection-request/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId)
//       .populate("connectionRequests", "name email profileImage")
//       .lean();

//     const connectionRequests = user.connectionRequests;

//     res.json(connectionRequests);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

//todo: endpoint to accept a connection request
// app.post("/connection-request/accept", async (req, res) => {
//   try {
//     const { senderId, recepientId } = req.body;

//     const sender = await User.findById(senderId);
//     const recepient = await User.findById(recepientId);

//     sender.connections.push(recepientId);
//     recepient.connections.push(senderId);

//     recepient.connectionRequests = recepient.connectionRequests.filter(
//       (request) => request.toString() !== senderId.toString()
//     );

//     sender.sentConnectionRequests = sender.sentConnectionRequests.filter(
//       (request) => request.toString() !== recepientId.toString()
//     );

//     await sender.save();
//     await recepient.save();

//     res.status(200).json({ message: "Friend request acccepted" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

//endpoint to fetch all the connections of a user
// app.get("/connections/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId)
//       .populate("connections", "name profileImage createdAt")
//       .exec();

//     if (!user) {
//       return res.status(404).json({ message: "User is not found" });
//     }
//     res.status(200).json({ connections: user.connections });
//   } catch (error) {
//     console.log("error fetching the connections", error);
//     res.status(500).json({ message: "Error fetching the connections" });
//   }
// });

//endpoint to create a post
app.post("/create", async (req, res) => {
  try {
    const { description, imageUrl, userId } = req.body;

    const newPost = new Post({
      description: description,
      imageUrl: imageUrl,
      user: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("error creating the post", error);
    res.status(500).json({ message: "Error creating the post" });
  }
});

//endpoint to fetch all the posts


//endpoint to update user description
// app.put("/profile/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { userDescription } = req.body;

//     await User.findByIdAndUpdate(userId, { userDescription });

//     res.status(200).json({ message: "User profile updated successfully" });
//   } catch (error) {
//     console.log("Error updating user Profile", error);
//     res.status(500).json({ message: "Error updating user profile" });
//   }
// });
