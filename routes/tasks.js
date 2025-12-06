const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
console.log({protect,authorize});
const {
  createTask, getTasks, getTask, updateTask, deleteTask
} = require("../controllers/taskController");
console.log({createTask,getTasks,getTask,updateTask,deleteTask});
// protected all
router.use(protect);

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;