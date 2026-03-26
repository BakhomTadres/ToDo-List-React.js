import { useEffect, useMemo, useState } from "react";
import ToDo from "./ToDo";
import Popup from "./Popup";
import { useNotification } from "../Contexts/NotificationContext";
import { useTasks } from "../Contexts/ReducerContext";
function ToDoList() {
  const { tasks, dispatch } = useTasks();
  const { showHideNotification } = useNotification();
  const [allNumber, setAllNumber] = useState(() => {
    return Number(localStorage.getItem("allNumber")) || 0;
  });
  const [completedNumber, setCompletedNumber] = useState(() => {
    return Number(localStorage.getItem("completedNumber")) || 0;
  });
  const [id, setId] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [test, setTest] = useState("All");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [idEdit, setIdEdit] = useState(0);
  const [editName, setEditname] = useState("");
  const [buttons, setButtons] = useState([
    { id: 1, name: "All", active: true },
    { id: 2, name: "Completed", active: false },
    { id: 3, name: "Not Completed", active: false },
  ]);
  useEffect(() => {
    setAllNumber(tasks.length);
    setCompletedNumber(tasks.filter((t) => t.isCompleted).length);
    localStorage.setItem("allNumber", tasks.length);
    localStorage.setItem(
      "completedNumber",
      tasks.filter((t) => t.isCompleted).length,
    );
  }, [tasks]);
  useEffect(() => {
    dispatch({ type: "getTasks" });
    setId(JSON.parse(localStorage.getItem("id")));
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
    dispatch({
      type: "add",
      payload: {
        id: JSON.parse(localStorage.getItem("id")),
        title: inputValue,
      },
    });
    showHideNotification("Add done");
    setId((idLocal) => idLocal + 1);
    JSON.stringify(localStorage.setItem("id", id + 1));
    setInputValue("");
  }
  function handleDeleteClick(id) {
    dispatch({ type: "delete", payload: { id: id } });
    setShow(false);
    showHideNotification("Delete done");
  }
  function handleCheckClick(id) {
    const task = tasks.find((t) => t.id === id);
    dispatch({ type: "check", payload: { id: id } });
    task.isCompleted
      ? showHideNotification("Not Completed")
      : showHideNotification("Completed");
  }
  function handleEditClick(id, name) {
    dispatch({ type: "edit", payload: { id: id, name: name } });
    setShowEdit(false);
    showHideNotification("Edit done");
  }
  const taskComleted = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);
  const taskNotComleted = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);
  const tasksList = (
    test == "All" ? tasks : test == "Completed" ? taskComleted : taskNotComleted
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
                if (inputValue != "") {
                  handleAddClick();
                }
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
        <div className="progress">
          <div className="progress-line">
            <span
              className="line"
              style={{
                width:
                  localStorage.getItem("allNumber") != 0
                    ? (localStorage.getItem("completedNumber") /
                        localStorage.getItem("allNumber")) *
                        100 +
                      "%"
                    : 0,
              }}
            ></span>
            <span className="progress-width">
              {localStorage.getItem("allNumber") != 0
                ? (
                    (localStorage.getItem("completedNumber") /
                      localStorage.getItem("allNumber")) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %
            </span>
          </div>
          <div className="info">
            <span>
              All:{" "}
              <span className="number">
                {localStorage.getItem("allNumber")}
              </span>{" "}
            </span>
            <span>
              Completed:{" "}
              <span className="number">
                {localStorage.getItem("completedNumber")}
              </span>
            </span>
          </div>
        </div>
        <button
          className="delete-all-btn"
          onClick={() => {
            showHideNotification("Delete all done");
            dispatch({
              type: "deleteAll",
            });
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