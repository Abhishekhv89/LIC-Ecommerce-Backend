const UserModel =require('../models/UserSchema');
const jwt = require('jsonwebtoken');



const registerUser = async(req,res)=>{
    try{
         const {name,email,password,phone,address} = req.body;
         console.log(name);
     if(!name){
    return res.json({
        error:'username is required'
    })
   };
   if(!password){
    return res.json({
        error:'passsword id required'
    })
   }

   const exist = await UserModel.findOne({name});
   console.log(exist);
   if(exist){
    return res.json({
        error:'user name is already taken'
    })
   }

//    console.log("went through");

   const user = await UserModel.create({name,email,password,address,phone});
    return res.json(user)


    }catch(error){
        console.log(error);
    }
   
}


const loginUser = async(req,res)=>{
    try{
   const {username,email,password} = req.body;

   const user = await UserModel.findOne({name:username});

   console.log(user);

    if(!user){
        return res.json({
            error:'User not found'
        })
    }else{
            if(user.password ===password){
                // jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{},(error,token)=>{
                //     if(error) throw error;
                //   res.cookie('token',token).json(user)
                // })  
               const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3d'})

                // res.json({
                //     auth:true,
                //     token:accessToken,
                //     user:user
                // })
                return res.status(200).json({username,token})
            //  const token = user.generateAuthToken();
            //  res.status(200).send({data:token,message:"logged in successfully!!"})


            }else{
                return res.json({error:"password or username is incorrect"});
            }
        }

      }catch(error){
        res.send({message:"server error"})
        console.log(error)
    }
    
}

const getProfile =(req,res)=>{
     res.json({auth:"true"});

}

   


module.exports ={registerUser,loginUser,getProfile};

