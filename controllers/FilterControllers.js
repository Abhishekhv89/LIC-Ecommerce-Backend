const FilterModel =require('../models/FiltersSchema');

const uploadFilter = async(req,res)=>{
  try{

   
   const filter = await FilterModel.create(req.body);
   if(filter){
    res.json({success:true})
   }else{
    res.json({error:true})
   }
  }catch(error){
    console.log("error: ",error)
  }
     
}

const getFilters = async(req,res)=>{
    try{
        const filters = await FilterModel.find({},{_id:0})
        if(filters){
            return res.json({filters:filters})
        }else{
           return res.json({error:"no filer found"});
        }
    }catch(error){
        console.log("error :",error);
        res.json({error:error})
    }
}

module.exports = {uploadFilter,getFilters}