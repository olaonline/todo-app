const express = require("express");
const connection = require("./connection");
const TodosModel = require("./models");
const cors = require('cors')
const port = 4444;

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.get("/todos", async (req, res) => {
  try {
    const alltodos = await TodosModel.find();
    res.send(alltodos);
  } catch {
    res.send({ msg: "Not able to fetch todos" });
  }
});

app.post("/todos/new", async (req, res) => {
  try {
    const task = { task: req.body.task, isCompleted: req.body.isCompleted };
    if (!task.task.trim()) {
      res.send({ msg: "task is all spaces! Enter a valid task" });
    } else {
      await TodosModel.create(task);
      res.send(task);
    }
  } catch {
    res.send({ msg: "Not able to add a task" });
  }
});

app.put("/todos/edit", async (req, res) => {
  const options = {
    new: true, // Return the updated document
    runValidators: true, // Validate the update operation against the schema
  };

  try {
    const _id = req.body._id;

    const updatedtask = {
      _id: req.body._id,
      task: req.body.task,
      isCompleted: req.body.isCompleted,
    };
    const result = await TodosModel.findByIdAndUpdate(_id, updatedtask, options);
    if (!result) {
      return res.status(404).send({ msg: "Task not found" });
    }
    res.send(result);
  } catch {
    res
      .status(500)
      .send({ msg: "Not able to edit a task", error: error.message });
  }
});

app.delete("/todos/delete/:_id", async (req, res) => {

    try {
        const _id = req.params._id;

        const result = await TodosModel.deleteOne({_id: _id});
        if (!result) {
          return res.status(404).send({ msg: "Task not found" });
        }
        res.status(200)
        .send({ msg: "Deleted!"});
      } catch {
        res
          .status(404)
          .send({ msg: "Not able to delete a task" });
      }
})

app.listen(process.env.port || port, () => {
  console.log(`Server connected to port ${process.env.port || port}`);
});