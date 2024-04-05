const User = require("../models/user");

class ProfileController {
  // [GET] /profile/:userId
  async show(req, res) {
    try {
      const userId = req.params.userId;
      console.log("userId: ", userId);
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      console.log("userId: ", user);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user profile" });
    }
  }
  // // [GET] /courses/create
  // create(req, res, next) {
  //     res.render('courses/create');
  // }

  // // [POST] /courses/store
  // store(req, res, next) {
  //     req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
  //     const course = new Course(req.body);
  //     course
  //         .save()
  //         .then(() => res.redirect('/me/stored/courses'))
  //         .catch((error) => {});
  // }

  // // [GET] /courses/:id/edit
  // edit(req, res, next) {
  //     Course.findById(req.params.id)
  //         .then((course) =>
  //             res.render('courses/edit', {
  //                 course: mongooseToObject(course),
  //             }),
  //         )
  //         .catch(next);
  // }

  // [PUT] /profile/:userId
  async update(req, res) {
    //endpoint to update user description
    try {
      const userId = req.params.userId;
      const { userDescription } = req.body;

      await User.findByIdAndUpdate(userId, { userDescription });

      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      console.log("Error updating user Profile", error);
      res.status(500).json({ message: "Error updating user profile" });
    }
  }

  // // [DELETE] /courses/:id
  // destroy(req, res, next) {
  //     Course.delete({ _id: req.params.id })
  //         .then(() => res.redirect('back'))
  //         .catch(next);
  // }

  // // [DELETE] /courses/:id/force
  // forceDestroy(req, res, next) {
  //     Course.deleteOne({ _id: req.params.id })
  //         .then(() => res.redirect('back'))
  //         .catch(next);
  // }

  // // [PATCH] /courses/:id/restore
  // restore(req, res, next) {
  //     Course.restore({ _id: req.params.id })
  //         .then(() => res.redirect('back'))
  //         .catch(next);
  // }
}

module.exports = new ProfileController();
