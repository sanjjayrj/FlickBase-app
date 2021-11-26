const express = require('express');
let router = express.Router();
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const { sortArgsHelper } = require('../../config/helpers')

/// MODEL
const { Article } = require('../../models/article_model')
const { Category } = require('../../models/category_model')

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

/// PAGINATION

router.route("/admin/paginate")
.post(checkLoggedIn, grantAccess('readAny','articles'), async(req,res)=>{
    try {

        // let aggQuery = Article.aggregate([
        //     { $match: {status:"public"}},
        //     { $match: { title:{ $regex:/some/ }}}
        // ])

        const limit = req.body.limit ? req.body.limit: 5;
        const aggQuery = Article.aggregate();
        const options = {
            page: req.body.page,
            limit,
            sort:{_id:'desc'}
        }

        const articles = await Article.aggregatePaginate(aggQuery, options)
        res.status(200).json(articles)
    } catch(error){
        console.log(error)
        res.status(400).json({message:'Error',error})
    }
})


/// NO AUTH REQUIRED

router.route('/get_byid/:id')
.get(async(req,res)=>{
    try{
        const _id = req.params.id;
        const article = await Article.find({_id:_id,status:'public'}).populate('category');
        if (!article || article.length === 0) {
            return res.status(400).json({ message: "Article not found" })
        }
        res.status(200).json(article)
    } catch(error){
        res.status(400).json({message:"Error fetching article",error:error})
    }
})


/// LOAD MORE

router.route('/loadmore')
.post(async(req,res)=>{
    try {
        let sortArgs = sortArgsHelper(req.body);

        const articles = await Article
        .find({status:'public'})
        .populate('category')
        .sort([[sortArgs.sortBy,sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

        res.status(200).json(articles)
    } catch(error){
        res.status(400).json({ message: "Error fetching article", error: error })
    }
})


/// CATEGORIES_SCHEMA
router.route("/categories")
.get(async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(400).json({message: "Error returing categories", error})
    }
})
.post(checkLoggedIn, grantAccess('createAny', 'categories'), async(req, res) =>{
    try{
        const category = new Category(req.body);
        await category.save()
        res.status(200).json(category);
    }catch(error){
        res.status(400).json({message:"Error adding new categories", error})
    }
});

module.exports = router;

// {
        //     "sortBy": "_id",
        //     "order": "asc",
        //     "limit": 10,
        //     "skip": 0
        // }