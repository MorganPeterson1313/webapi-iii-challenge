const express = require('express');

const router = express.Router();
const db = require('./postDb');

router.get('/', async (req, res) => {
    try{
            const posts = await
            db.get(req.body)
            if(posts){
                res.status(200).json({success:true, posts})
            }else{
                res.status(400).json({message:'the posts you are looking or are not here'})
            }
        
    }catch (err){

res.status(500).json({success:flase, err})
    }
});

router.get('/:id', validatePostId, async (req, res) => {
try{
            
            const post = await
            db.getById(req.post)
                res.status(200).json({success: true, post})



            }catch(err){
res.status(500).json({success:false, err})
            }



});

router.delete('/:id',validatePostId, async (req, res) => {
                try{
                    
                    const deleted = await
                    db.remove(req.post);
                    if(deleted){
                        res.status(200).json({succes:true, deleted})
                    }else{
                        res.status(404).json({success: false, message:'post not found'})
                    }
                }catch(err){
                    res.status(500).json({success:false, err})
                }


                
});

router.put('/:id',validatePostId, async (req, res) => {
                try{
                    const update = await
                    db.insert(request.params.id, request.body)
                    if(update){
                        res.status(200).json({success: true, update});
                        }else{
                            res.status(404).json({message:'the post you are looking for is not here'})
                        }
                }catch(err){
                    res.status(500).json({success: false, err});
                }
});

// custom middleware

async function validatePostId(req, res, next) {
    const {id}= req.params;
    const post = await db.getById(id);
    if (post){
        req.post = post;
        next();
    }else{
        res.status(400).json({message:'id not found'});
    }
    
    
     
};

module.exports = router;