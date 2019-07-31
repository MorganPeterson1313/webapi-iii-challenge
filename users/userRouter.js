const express = require('express');

const router = express.Router();
const db = require('./userDb');

router.post('/',  validateUser, async (req, res) => {
    try{
        const user = await
db.insert(req.body);


                if(user){
                    res.status(200).json(user);

                }else{
                    res.status(404).json({message:'please include the name of the user'});
                }
            }catch(err){
                res.status(500).json({success: false, err})
            }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
                try{
                    const post = await
                    db.insert(req.body)
                    if(post){
                        res.status(200).json({success:true, post})

                    }else {
                        res.status(404).json({message:'please include the post text'});
                    }
                }catch(err){
                    res.status(500).json({success:false, err})
                }

});

router.get('/', async (req, res) => {
    try{
        const users = await
        db.get(req.query);
        res.status(200).json({success: true, users})
        } catch (err){
            res.status(500).json({success:false,err})
        }
});

router.get('/:id', validateUserId, async (req, res) => {
        try{
        
            const user = await
            
            db.getById(req.user)

                if (user){
                    res.status(200).json(user)
                }else{res.status(400).json({message:'user not found'})}
        }catch (err){
            res.status(500).json({success: false , err})
        }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
        try{
            const post = await
            db.getUserPosts(req.params.id);
            if(post){
res.status(200).json(post)

            } else{
                res.status(400).json({message: 'post not found'});
            } 
           }   catch(err){
                res.status(500).json({success:false, err})
            }

        
});

router.delete('/:id',  validateUserId, async (req, res) => {
                try{

                 const   deleted = await
                 db.remove(req.user);
               if(deleted) {
                   res.status(200).json(deleted);
               } else{
                   res.status(400).json({message:'user not found'})
               }
            }catch (err){
                res.status(500).json({success: false, err})
            }



});

router.put('/:id',  validateUserId, async (req, res) => {
                try{

                    const changes = await
                    db.update(request.params.id, request.body);
                    if (changes){
                       res.status(200).json({success:true, changes}) 


                    }else{
                        res.status(404).json({message: 'the user you are looking for is not here'})
                    }
                }catch (err){
                        res.status(500).json({success:false, err})

                    }
                
            

                




});

//custom middleware

async function validateUserId(req, res, next) {
const {id}= req.params;
const user = await db.getById(id);
if (user){
    req.user = user;
    next();
}else{
    next({message:'id not found'});
}


};

async function validateUser (req, res, next) {
const {name} = req.body;
if(!name){
    next({message:'missing user name'});
}else{
    next();
}
};

async function validatePost(req, res, next) {
const {text} = req.body;
const postData = req.body;

if(!text && Object.keys(req.body).length > 0){
    next();
}else
{
    next({message:'missing post body'});

}

};

module.exports = router;
