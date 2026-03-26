import { createContext, useContext, useState } from "react";
import Notification from "../Components/Notification";
export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
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
    <NotificationContext.Provider value={{ showHideNotification }}>
      {show ? <Notification message={message} /> : ""}
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => useContext(NotificationContext);
