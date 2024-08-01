const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserSchema')

isAuthenticate = async(req,res,next)=>{
try{
    // // verify authentication
    // const {authorization} = req.headers
    // // consol
    // console.log(req.cookies);

    // if(!authorization){
    //     return res.status(401).json({error:'Authorization token required'})
    // }

    // const token = authorization.split(' ')[1]
    // // console.log("token :",token);

    
    //   const {id} = jwt.verify(token,process.env.JWT_SECRET)
    //   req.user = await UserModel.findOne({_id:id}).select('_id')
      
    //   next();

    // const { token } = req.cookies;
    
    const token = req.cookies['token'];
    // console.log(token);

    if (!token) {
      return res.json({ error: "Please Login to access this resource" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decodedData.id);

    next();
  } catch (err) {
    console.log("Error:", err);
    return res.json({ error: 'Request is not authorized' });
  }
}

const authorizeRoles = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.json({error:`Role: ${req.user.role} is not allowed to access this resouce `})
    }
    next();
  };
};


module.exports = {isAuthenticate, authorizeRoles };
