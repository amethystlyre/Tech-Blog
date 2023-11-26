const router = require('express').Router();
const { User, Post, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        console.log(posts);
        res.render('homepage', {
            posts: posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({ 
            where: { post_id: req.params.id},
            include: [
                {
                    model: Post,
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const comments = commentData.map((comment) =>
        comment.get({ plain: true })
    );
        console.log(comments);

        res.render('comment', {
            comments: comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
