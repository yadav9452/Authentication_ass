const express = require("express");
const Product = require("../models/post.model");
const authenticate=require("../middleware/authenticate");


const router = express.Router();

router.post("",authenticate,async(req,res)=>{

        // console.log(req);
        req.body.user_id=req.user._id;
        try{
            const product= await Product.create(req.body);
            return res.status(200).send(product);

        }
        catch(err){
            return res.status(400).send({message:err.message});
        }
});



module.exports = router;