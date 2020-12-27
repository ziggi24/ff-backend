const express = require('express');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz-', 5);
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) =>{
    return res.json({ // test route
        message: "Hello api/ get request!"
    })
});

router.post('/', async (req, res) =>{
    console.log(req.body);
    let {slug, url} = req.body;
    try{
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

    } catch (err) {// if an error is thrown 
        //build out into error catching middleware
        console.log(err);
        return res.json(err);

    }
})

module.exports = router;