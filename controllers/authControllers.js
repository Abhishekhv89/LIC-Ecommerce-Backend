const UserModel =require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator')
const  {creatUserValidation , customMessages} = require('../helpers/validation_Shema')
const {user_req,user_taken,pass_req,email_req,email_not_valid,email_taken,ph_req,ph_taken,inCrt_pass,ser_err} = require('../constants')



const registerUser = async(req,res)=>{
    try{
        const {error } = creatUserValidation.validate(req.body, { messages: customMessages });

        if(error)
            { return res.json({
        error:error.details[0].message
    })}
         const {name,email,password,phone,address} = req.body;
        //  console.log(name);
     if(!name){
    return res.json({
        error: user_req
    })
   }else if(!password){
    return res.json({
        error:pass_req
    })
   }else if(!email){
    return res.json({
        error:email_req
    })
   }else if(!phone){
    return res.json({
        error:ph_req
    })
   }

   if(!validator.isEmail(email)){
    return res.json({
        error:email_not_valid
    })
   }


   const username = await UserModel.findOne({name});

   if(username){
    return res.json({
        error:user_taken
    })
   }
   const Email = await UserModel.findOne({email});

   if(Email){
    return res.json({
        error:email_taken
    })
   }
   const Phone = await UserModel.findOne({phone});

   if(Phone){
    return res.json({
        error:ph_taken
    })
   }



//    console.log("went through");
 const salt= await bcrypt.genSalt(10);
 const hash = await bcrypt.hash(password,salt);


   const user = await UserModel.create({name,email,password:hash,address,phone});
    return res.json(user)


    }catch(error){
        console.log(error);
    }
   
}


const loginUser = async(req,res)=>{
    try{
   const {username,email,password} = req.body;

   if(!username){
    return res.json({
        error:user_req
    })
   }else if(!password){
    return res.json({
        error:pass_req
    })
   }else if(!email){
    return res.json({
        error: email_req
    })
   }

   const user = await UserModel.findOne({email});
//    console.log(user);

//    console.log(user);
  

    if(!user){
        return res.json({
            error:`${email} is not registered`
        })
    }else{
         if(username!==user.name){
            return res.json({
            error:`username '${username}' is not registered for ${email}`
        })
         }


        const match = await bcrypt.compare(password,user.password)
            if(match){
            
               const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3d'})

               
                return res.status(200).json({username,token})



            }else{
                return res.json({error:inCrt_pass});
            }
        }

      }catch(error){
        res.send({message:ser_err})
        console.log(error)
    }
    
}

const getProfile =(req,res)=>{
     res.json({auth:"true"});

}

   


module.exports ={registerUser,loginUser,getProfile};

