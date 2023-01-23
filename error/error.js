const handleError = (error,req,res,next)=>{
    if(error){
        console.log(error)
    }
};

module.exports = handleError;