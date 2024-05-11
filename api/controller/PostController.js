const Post = require('../models/post');

class PostController {
    // [GET] /posts
    async show(req, res) {
        try {
          const posts = await Post.find().populate("user", "name profileImage");
          res.status(200).json({ posts });
        } catch (error) {
          console.log("error fetching all the posts", error);
          res.status(500).json({ message: "Error fetching all the posts" });
        }
    }

    // [GET] /posts/:slug
    async detail (req, res) {
        try {
          const postId = req.params.postId;
          const post = await Post.findById(postId).populate("user", "name profileImage").populate({"path":"comments",populate:[{
             path:"user",
             model:"User"
            }]})
          // const _post = await post.populate("comments.user");
          console.log('post: ', post);
          if (!post) {
            return res.status(400).json( { message: "Post not found"} );
          }
          res.status(200).json(post);
        } catch (error) {
          console.log("error fetching all the posts", error);
          res.status(500).json({ message: "Error fetching all the posts" });
        }
    }

    // [GET] /posts/comments
    async comments(req, res, next) {
      try {
        console.log('req: ', req);
        // const comments = await Post.findById(req.params.postId).populate("user")
      }catch(error) {
        console.log('error: ', error);
        res.status(500).json({ message: "Error fetching all the comments"});
      }
    }

    // [POST] /posts/comment/:slug
    async updateComment(req, res) {
      console.log('req: ', req.body);
      try {
         const newComment = {
          text: req.body.content,
          user: req.body.userId,
         }
         const result =  await Post.updateOne({_id: req.params.slug}, {
          $push: { comments: newComment} 
         });
         console.log('result: ', result);
         res.status(200);
      } catch (error){
        console.log('error: ', error);
        res.status(500).json( { message: "Error post the comment"});
      }
    }

    // [POST] /posts/like/:postId
    async like(req, res) {
      // try {
        const postId = req.params.postId;
        const userId = req.params.userId;
        console.log('postId: ', postId);
        console.info('userId: ', userId);
      //   const post = await Post.findById(postId);
      //   if (!post) {
      //     return res.status(400).json({ message: "Post not found" });
      //   }
    
      //   //check if the user has already liked the post
      //   const existingLike = post?.likes.find(
      //     (like) => like.user.toString() === userId
      //   );
    
      //   if (existingLike) {
      //     post.likes = post.likes.filter((like) => like.user.toString() !== userId);
      //   } else {
      //     post.likes.push({ user: userId });
      //   }
    
      //   await post.save();
    
      //   res.status(200).json({ message: "Post like/unlike successfull", post });
      // } catch (error) {
      //   console.log("error likeing a post", error);
      //   res.status(500).json({ message: "Error liking the post" });
      // }
    }
    // [GET] /courses/:id/edit
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