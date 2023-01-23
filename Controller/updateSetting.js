const { default: mongoose } = require('mongoose');
const User = require('../model/user');
const updateSetting = async (req,res)=>{
    const userId = mongoose.Types.ObjectId(req.user.userId);
    const updateData = {currency:req.body.currency,name:req.body.name}
    if(req.file){
      updateData.image=req.file.buffer;
    }
    try{
      const {currency,image,name} = await User.findByIdAndUpdate(userId,updateData,{new:true});
      res.status(200).json({msg:'Successfully updated setting.',data:{currency,image,name}})
    }
    catch(e){
       res.status(500).json({msg:'something went wrong !'})
    }
}

module.exports = updateSetting;