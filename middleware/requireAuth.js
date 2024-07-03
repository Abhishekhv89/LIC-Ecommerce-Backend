const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserSchema')

const requireAuth = async(req,res,next)=>{

    // verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    // console.log("token :",token);

    try{
      const {id} = jwt.verify(token,process.env.JWT_SECRET)
      req.user = await UserModel.findOne({_id:id}).select('_id')
      
      next();
    }catch(err){
        console.log("Error:",err);
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = requireAuth