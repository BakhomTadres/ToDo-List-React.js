import ToDoList from "./Components/ToDoList";
import "./Style.css";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { ReducerProvider } from "./Contexts/ReducerContext";
function App() {
  return (
    <>
      <ReducerProvider>
        <NotificationProvider>
          <ToDoList />
        </NotificationProvider>
      </ReducerProvider>
    </>
  );
}

export default App;
