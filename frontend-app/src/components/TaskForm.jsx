import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

import React from "react";

function TaskForm({ addTask }) {
  const [value, setValue] = useState("");

  const SubmitTask = (e) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  return (
    <Form onSubmit={SubmitTask}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          className="todo-input"
          value={value}
          placeholder="Enter a Task ..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button
          className="todo-btn"
          type="submit"
          variant="primary"
          id="button-addon2"
        >
          Add Task
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TaskForm;
