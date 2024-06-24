import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function Task({ task, DeleteTask, EditTask }) {
  const [inputValue, setInputValue] = useState(task.task);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      EditTask(task._id, inputValue, task.isCompleted);
      setIsEditing(false);
    }
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Checkbox
          defaultChecked={task.isCompleted}
          onClick={() => EditTask(task._id, task.value, !task.isCompleted)}
        />
        <Form.Control
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className={`${
            task.isCompleted ? "text-decoration-line-through fw-light" : ""
          }`}
        />
        {isEditing && (
          <InputGroup.Text
            onClick={() => {
              EditTask(task._id, inputValue, task.isCompleted);
              setIsEditing(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <FaCheck />
          </InputGroup.Text>
        )}
        {/* <InputGroup.Text onClick={()=>{EditTask(task.id)}} style={{cursor: 'pointer'}}>
          <FaPenToSquare />
        </InputGroup.Text> */}
        <InputGroup.Text
          onClick={() => {
            DeleteTask(task._id);
          }}
          style={{ cursor: "pointer" }}
        >
          <FaTrash />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
}

export default Task;
