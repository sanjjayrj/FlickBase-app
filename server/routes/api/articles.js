const express = require('express');
let router = express.Router();
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');

/// MODEL
const { Article } = require('../../models/article_model')

// add single article
// admin get,patcch,delete single article {draft / public}
// get articles no auth
// fetch articles load more
// fetch articles, with pagination


router.route('/admin/add_articles')
.post(checkLoggedIn,grantAccess('createAny','article'), async (req,res)=>{
    try {
        /// run some other code to validate if necessary
        const article = new Article({
            ...req.body,
            score:parseInt(req.body.score)
        })
        const result = await article.save()
        res.status(200).json(result)
    } catch(error) {
        return res.status(400).json({message:"Error adding article",error:error})
    }
})

module.exports = router;