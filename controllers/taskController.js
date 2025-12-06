const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id
    });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    // filters: status, assignedTo, createdBy, priority, search
    const query = {};
    if(req.query.status) query.status = req.query.status;
    if(req.query.priority) query.priority = req.query.priority;
    if(req.query.assignedTo) query.assignedTo = req.query.assignedTo;
    if(req.query.createdBy) query.createdBy = req.query.createdBy;
    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");
    if(!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found" });

    // Optional: check ownership/permissions
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) { next(err); }
};