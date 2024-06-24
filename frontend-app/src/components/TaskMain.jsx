import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import axios from "axios";

function TaskMain() {
  const [Tasks, setTasks] = useState([]);

  const fetchTodos = async () => {
    try {
      const result = await axios.get("http://localhost:4444/todos");
      setTasks(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = (value) => {
    const newTask = {
      task: value,
      isCompleted: false,
    };

    axios
      .post("http://localhost:4444/todos/new", newTask)
      .then((response) => {
        console.log("Response:", response.data);
        fetchTodos();
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // const CheckTask = (id) => {
  //   setTasks(
  //     Tasks.map((task) =>
  //       task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  //     )
  //   );
  // };

  const DeleteTask = async (id) => {
    try{
    const URL = `http://localhost:4444/todos/delete/${id}`;
    const result = await axios.delete(URL);
    console.log("Response:", result.data);
    fetchTodos();
  }
  catch (error) {
    console.error('Error deleting task:', error.response ? error.response.data : error.message);
  }}

  const EditTask = async (id, value, isCompleted) => {
    const updatedTask = {_id: id, task: value, isCompleted: isCompleted} ;
    try{
      const result = await axios.put("http://localhost:4444/todos/edit", updatedTask);
      console.log("Response:", result.data);
      fetchTodos();
    }
    catch(error){
      console.error('Error deleting task:', error.response ? error.response.data : error.message);

    }
  };

  return (
    <Container fluid="md" md="auto" className="p-5">
      <h2 className="p-5 text-center">What are you main goals today?</h2>
      <Row>
        <Col>
          <TaskForm addTask={addTask} />

          {Tasks.map((value) => {
            return (
              <Task
                key={value._id}
                task={value}
                DeleteTask={DeleteTask}
                EditTask={EditTask}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default TaskMain;
