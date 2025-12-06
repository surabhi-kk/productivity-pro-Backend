module.exports=(err,req,res,next)=>{
    console.error(err.stack);
    const status=err.statusCode || 500;
    res.status(status).json({
        message:err.message || "server Error",
        stack:process.env.NODE_ENV === "production" ? undefined:err.stack
    });
};