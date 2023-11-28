const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        //console.log(req.body);
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
        } else {
            res.json(postData);
        }
    } catch {
        (err) => res.status(500).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        //console.log(req.body);
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
        } else {
            res.json(postData);
        }
    } catch {
        (err) => res.status(500).json(err);
    }
});
module.exports = router;
