const AsyncHandler=(fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.status||500).json({
            success:true,
            message:error.message,
        })
        
    }
}

export {AsyncHandler};