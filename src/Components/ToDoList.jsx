import { use, useEffect, useState } from "react";
import ToDo from "./ToDo";
import Popup from "./Popup";
function ToDoList() {
  const [id, setId] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [test, setTest] = useState("All");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [idEdit, setIdEdit] = useState(0);
  const [editName, setEditname] = useState("");
  const [buttons, setButtons] = useState([
    {
      id: 1,
      name: "All",
      active: true,
    },
    {
      id: 2,
      name: "Completed",
      active: false,
    },
    {
      id: 3,
      name: "Not Completed",
      active: false,
    },
  ]);
  useEffect(() => {
    const savedData = localStorage.getItem("tasks");
    if (savedData) {
      try {
        const savedTasks = JSON.parse(savedData);
        if (Array.isArray(savedTasks) && savedTasks.length > 0) {
          setTasks(savedTasks);
          const maxId = Math.max(...savedTasks.map((t) => t.id));
          setId(maxId + 1);
        } else {
          setTasks([]);
          setId(1);
        }
      } catch (error) {
        console.error("Error parsing tasks:", error);
        setTasks([]);
        setId(1);
      }
    } else {
      setTasks([]);
      setId(1);
    }
  }, []);
  // Functions For ToDo
  function handleDeleteToDo(id) {
    setShow(true);
    setIdDelete(id);
  }
  function handleEditToDo(id, name) {
    setEditname(name);
    setShowEdit(true);
    setIdEdit(id);
  }
  // Functions For ToDoList
  function handleActiveClick(id) {
    const newButtons = buttons.map((button) => {
      if (button.id == id) {
        button.active = true;
        setTest(button.name);
      } else {
        button.active = false;
      }
      return button;
    });
    setButtons(newButtons);
  }
  function handleAddClick() {
    setTasks([...tasks, { id: id, name: inputValue, isCompleted: false }]);
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        { id: id, name: inputValue, isCompleted: false },
      ]),
    );
    setId((id) => id + 1);
    setInputValue("");
  }
  function handleDeleteClick(id) {
    const tasksFilter = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(tasksFilter);
    setShow(false);
    localStorage.setItem("tasks", JSON.stringify(tasksFilter));
  }
  function handleCheckClick(id) {
    let tasksCheck = tasks.map((t) => {
      if (t.id == id) {
        t.isCompleted == true
          ? (t.isCompleted = false)
          : (t.isCompleted = true);
      }
      return t;
    });
    setTasks(tasksCheck);
    localStorage.setItem("tasks", JSON.stringify(tasksCheck));
  }
  function handleEditClick(id, name) {
    let tasksEdit = tasks.map((t) => {
      if (t.id == id) {
        t.name = name;
      }
      return t;
    });
    setTasks(tasksEdit);
    setShowEdit(false);
    localStorage.setItem("tasks", JSON.stringify(tasksEdit));
  }
  const tasksList = (
    test == "All"
      ? tasks
      : test == "Completed"
        ? tasks.filter((t) => t.isCompleted)
        : tasks.filter((t) => !t.isCompleted)
  ).map((task) => {
    return (
      <ToDo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.isCompleted}
        handleDelete={() => handleDeleteToDo(task.id)}
        handleEdit={() => handleEditToDo(task.id, task.name)}
        handleCheck={() => handleCheckClick(task.id)}
      />
    );
  });
  const buttonsList = buttons.map((button) => {
    return (
      <button
        onClick={() => handleActiveClick(button.id)}
        key={button.id}
        className={button.active ? "active" : ""}
      >
        {button.name}
      </button>
    );
  });
  return (
    <>
      {show ? (
        <div className="overlay" onClick={() => setShow(false)}></div>
      ) : (
        ""
      )}
      {show ? (
        <Popup
          handleShow={setShow}
          handleDeleteConfirm={handleDeleteClick}
          id={idDelete}
        />
      ) : (
        ""
      )}
      {showEdit ? (
        <div className="overlay" onClick={() => setShowEdit(false)}></div>
      ) : (
        ""
      )}
      {showEdit ? (
        <Popup
          handleShow={setShowEdit}
          handleEditConfirm={handleEditClick}
          id={idEdit}
          type={"edit"}
          inputValue={editName}
        />
      ) : (
        ""
      )}{" "}
      <div className="to-do-list">
        <div className="top-todo-list">
          <input
            id="add"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddClick();
              }
            }}
          />
          <label htmlFor="add" className="add">
            Enter A Task
          </label>
          <button disabled={inputValue.length == 0} onClick={handleAddClick}>
            Add Task
          </button>
        </div>
        <div className="buttons">{buttonsList}</div>
        <button
          className="delete-all-btn"
          onClick={() => {
            setTasks([]);
            localStorage.setItem("tasks", JSON.stringify([]));
          }}
        >
          Delete All
        </button>
        {tasksList}
      </div>
    </>
  );
}
export default ToDoList;
