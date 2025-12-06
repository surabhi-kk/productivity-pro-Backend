const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema = new mongoose.Schema(  {
name:{type:String, require: true, trim:true },
email:{type:String, require: true, unique:true, lowercase:true, trim:true },
password:{type:String, require: true },
role:{type:String, enum:["admin","member"], default:"member"}
},{timestamps: true}
    );
 //hash password
 userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    next();
    
 });

 //compare password
 userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
 };


module.exports=  mongoose.models.User || mongoose.model("User",userSchema);
