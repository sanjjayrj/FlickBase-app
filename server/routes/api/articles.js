const express = require('express');
let router = express.Router();
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');

/// MODEL
const { Article } = require('../../models/article_model')

// add single article - DONE
// admin get,patcch,delete single article {draft / public} - DONE
// get articles no auth
// fetch articles load more
// fetch articles, with pagination


router.route('/admin/add_articles')
    .post(checkLoggedIn, grantAccess('createAny', 'article'), async (req, res) => {
        try {
            /// run some other code to validate if necessary
            const article = new Article({
                ...req.body,
                score: parseInt(req.body.score)
            })
            const result = await article.save()
            res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({ message: "Error adding article", error: error })
        }
    })

router.route('/admin/:id')
    .get(checkLoggedIn, grantAccess('readAny', 'article'), async (req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findById(_id);
            if (!article || article.length === 0) {
                return res.status(400).json({ message: "Article not found" })
            }
            res.status(200).json(article);
        } catch (error) {
            return res.status(400).json({ message: "Error fetching article", error })
        }
    })
    .patch(checkLoggedIn, grantAccess('updateAny', 'article'), async (req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findOneAndUpdate(
                {_id},
                {
                    "$set": req.body
                },
                {
                    new: true
                }
            );
            if(!article) return res.status(400).json({message: "Article not found"})
            res.status(200).json(article);
        } catch (error) {
            return res.status(400).json({ message: "Error updating article", error })
        }
    })
    .delete(checkLoggedIn, grantAccess('deleteAny', 'article'), async (req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findByIdAndRemove(_id);
            if(!article) return res.status(400).json({message:'Article not found'});
            res.status(200).json({_id:article._id})
        } catch (error) {
            return res.status(400).json({ message: "Error deleting article", error })
        }
    })

module.exports = router;