const User = require("../models/user");

class UserController {
  // [GET] /users/:userId
  async show(req, res) {
    try {
      const loggedInUserId = req.params.userId;

      //fetch the logged-in user's connections
      const loggedInuser = await User.findById(loggedInUserId).populate(
        "connections",
        "_id"
      );
      if (!loggedInuser) {
        return res.status(400).json({ message: "User not found" });
      }

      //get the ID's of the connected users
      const connectedUserIds = loggedInuser.connections.map(
        (connection) => connection._id
      );

      //find the users who are not connected to the logged-in user Id
      const users = await User.find({
        _id: { $ne: loggedInUserId, $nin: connectedUserIds },
      });

      res.status(200).json(users);
    } catch (error) {
      console.log("Error retrieving users", error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  }
  async getInfo(req, res) {
    try {
      const { userId } = req.params;
  
      //fetch the user data from the user ID
      const recepientId = await User.findById(userId);
  
      res.status(200).json(recepientId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
