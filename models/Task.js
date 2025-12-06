const mongoose=require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{type:String, require:true,trim:true},
     description:{type:String, default:""},
     priority:{type:String,enum:["Low","Medium","High"], default:"Medium"},
     status:{type:String,enum:["Pending","In Progress","Completed"], default:"Pending"},
dueDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
