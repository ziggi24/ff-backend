const express = require('express');
const validator = require('validator');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz-', 5);
const db = require('../models');

const router = express.Router();


router.get('/:slug', async (req, res) =>{ //Url lookup and fast-forward route
    try{
        const destUrl = await db.Url.findOne({ slug: req.params.slug}); //looking up destUrl by slug
        if(destUrl){
            destUrl.count++;
            destUrl.save();
            return res.redirect(destUrl.destUrl) //if slug returns db object, reroute to destUrl
        }
    } catch (err) { //catching errors, to be replaced with error handling middleware
        console.log(err);
        return res.json(err);
    }
    
});

router.get('/:slug/info', async (req, res) =>{ // to get more info about the URL as well as see how many times it's been used.
    try {
        const foundUrl = await db.Url.findOne({slug: req.params.slug});//checking to see if the slug exists in db
        if(foundUrl){
            return res.json(foundUrl); // return full db object
        } else {
            return res.json({// if slug cannot be found
                message: "Slug not found"
            });
        }
    } catch (err) { // to be replaced with error catching middleware. 
        console.log(err);
        return res.json(err);
    }

})

router.post('/', async (req, res) =>{
    console.log(req.body);
    let {slug, url} = req.body;
    try{
        if(validator.isURL(url)){//url backend validation. 
            if(slug){ // if a slug has been specified
                const slugExists = await db.Url.findOne({slug: slug}) //check to see if it exists
                if(slugExists){ //slug already exists
                    return res.json({
                        message: "Error, Slug in Use"
                    })
                } else { // slug doesn't exist yet, create new db entry and send it back to user
                    const newUrl = {
                        destUrl: url,
                        slug: slug,
                        shortUrl: `https://ffrf.fr/${slug}`
                    }
                    const created = await db.Url.create(newUrl);
                    return res.json(created);
                }
            } else { // no slug specified
                let uniqueSlug = false;
                let newSlug;
                while(!uniqueSlug){
                    newSlug = nanoid();//generate new slug
                    const slugCheck = await db.Url.findOne({slug: newSlug});//check to see if the slug exists
                    if(!slugCheck){//if slug doesnt exist
                        uniqueSlug = true; //breaks the while loop
                    }
                }
                const newUrl = {
                    destUrl: url,
                    slug: newSlug,
                    shortUrl: `https://ffrf.fr/${newSlug}`
                }
                const created = await db.Url.create(newUrl);
                return res.json(created);
    
            }
        } else {
            return res.json({
                message: "invalid URL"
            })
        }
        

    } catch (err) {// if an error is thrown 
        //build out into error catching middleware
        console.log(err);
        return res.json(err);

    }
})

module.exports = router;