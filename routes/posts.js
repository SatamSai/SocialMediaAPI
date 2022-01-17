const Post = require('../models/Post')
const User =require('../models/User')
const router = require('express').Router();
//create a post
router.post('/',async(req, res) => {
    //create post
    const newPost=new Post(req.body);
    try{
        //save post and response
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//update a post
router.put('/:id',async(req, res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post Succesfully Updated")
        }
        else{
            res.status(403).json('You can only update your post')
        }
    } catch (error) {
        res.status(500).json('user does not exist')
    }
})

//delete a post
router.delete('/:id',async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post Succesfully Deleted")
        }
        else{
            res.status(403).json('You can only delete your post')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//like and dislike a post
router.put("/:id/like",async(req, res) => {
    try {
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("Post has been liked")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("Post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})


//get a post
router.get("/:id",async(req, res)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json("Post does not exist")
    }
})

//get timeline posts
router.get("/timeline/all",async(req, res)=>{
    try {
        const currentUser=await User.findById(req.body.userId)
        const userPosts=await Post.find({userId:currentUser._id});
        const friendsPosts=await Promise.all(
            currentUser.followings.map(friendId=>{
                return Post.find({userId:friendId});
            })
        );
        res.json(userPosts.concat(...friendsPosts))
    } catch (error) {
        res.status(500).json("you and your followers has not posted anything")
    }
})

module.exports = router;