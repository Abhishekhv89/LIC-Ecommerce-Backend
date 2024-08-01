const UserModel =require('../models/UserSchema');
const validator = require('validator')
const  {creatUserValidation , customMessages} = require('../helpers/validation_Shema')
const {user_req,user_taken,pass_req,email_req,email_not_valid,email_taken,ph_req,ph_taken,inCrt_pass,ser_err} = require('../constants');
const FilterModel = require('../models/FiltersSchema');



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



   const user = await UserModel.create({name,email,password,address,phone});
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

   const user = await UserModel.findOne({email}).select("+password");
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
         


        const match = user.comparePassword(password);
            if(match){
                   const token =  user.getJWTToken();
                  const options = {
                        expires: new Date(
                        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    };

                return res.status(200).cookie("token", token, options).json({username,userId:user._id,role:user.role});

            

            }else{
                return res.status(401).json({error:inCrt_pass});
            }
        }

      }catch(error){
        res.send({message:ser_err})
        console.log(error)
    }
    
}

const dashboard =(req,res)=>{




     res.json({auth:"true"});
}

const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: " Successfully Logged Out",
  });
};



const adminPage = (req,res)=>{
   return res.json({auth:"true"});
}

const getUser = async(req,res)=>{
    try{
        const {userId} = req.params;
        const user = await UserModel.findOne({_id:userId});
    if(!user){
        return res.json({error:"User found"});
    }else{
         res.json({user:user});
    }

    }catch(error){
        console.log("get user error : ",error.message)
    res.status(500).send(error.message);
}
}

const getAllUsers = async(req,res)=>{
    try{
        const users = await UserModel.find({role:"user"},{name:1,email:1,_id:1});
    if(!users){
        return res.json({error:"no User found"});
    }else{
         res.json({users:users});
    }

    }catch(error){
        console.log("get All users error : ",error.message)
    res.status(500).send(error.message);
    }
    

}


// .get('/api/search', 

const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await UserModel.find({
         $and: [
    {
      $or: [
        { name: new RegExp(query, 'i') },
        { email: new RegExp(query, 'i') }
      ]
    },
    { role: "user" }
  ]
    },{name:1,email:1,_id:1}).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAdminUsers = async(req,res)=>{
    try{
        const adminUsers = await UserModel.find({role:"admin"},{name:1,email:1,_id:1});
    if(!adminUsers){
        return res.json({error:"no User found"});
    }else{
         res.json({adminUsers:adminUsers});
    }

    }catch(error){
        console.log("get Aadmin users error : ",error.message)
    res.status(500).send(error.message);
    }
    

}




const makeAdmin = async(req,res)=>{
    try{
         const {userId} = req.params;

        //  console.log(userId);
        const user = await UserModel.findOne({_id:userId});
        if(!user){
            return res.json({error:"user not found"});
        }

      const result = await UserModel.findByIdAndUpdate(userId,{role:'admin'}, { new: true });
        // console.log(result);
        if(result){
           return res.json({success:true});
        }else{
           return res.json({error:"could not update the user"})
        }


    }catch(error){
    console.log("make admin error : ",error.message)
    res.status(500).send(error.message);
    }
}

const removeAdmin = async(req,res)=>{
    try{
         const {userId} = req.params;

        //  console.log(userId);
        const user = await UserModel.findOne({_id:userId});
        if(!user){
            return res.json({error:"user not found"});
        }

      const result = await UserModel.findByIdAndUpdate(userId,{role:'user'}, { new: true });
        // console.log(result);
        if(result){
           return res.json({success:true});
        }else{
           return res.json({error:"could not update the user"})
        }


    }catch(error){
    console.log("make admin error : ",error.message)
    res.status(500).send(error.message);
    }
}


   


module.exports ={registerUser,loginUser,dashboard,logout,adminPage,getAllUsers,makeAdmin,getUser,getAdminUsers,removeAdmin,searchUsers};

