import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ToDoList from "./Components/ToDoList";
import Notification from "./Components/Notification";
import "./Style.css";
import { NotificationContext } from "./Contexts/NotificationContext";
function App() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  function showHideNotification(message) {
    setMessage(message);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }
  return (
    <>
      <NotificationContext.Provider value={{ showHideNotification }}>
        {show ? <Notification message={message} /> : ""}
        <ToDoList />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
