const Post = require('../models/post');

class PostController {
    // [GET] /courses/:slug
    async show (req, res) {
        try {
          const posts = await Post.find().populate("user", "name profileImage");
          res.status(200).json({ posts });
        } catch (error) {
          console.log("error fetching all the posts", error);
          res.status(500).json({ message: "Error fetching all the posts" });
        }
    }

    // [GET] /courses/create
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

    // // [PUT] /courses/:id
    // update(req, res, next) {
    //     Course.updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect('/me/stored/courses'))
    //         .catch(next);
    // }

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

module.exports = new PostController();