const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//add new comment to post
router.post('/:id', withAuth, async (req, res) => {
    try {
        const postId= req.params.id;
        const comment = req.body.comment;
        //console.log(postId);
        //console.log(comment);
        const newComment = await Comment.create({
            content: comment,
            post_id: postId,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;