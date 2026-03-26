import tasksReducer from "../Reducers/tasksReducer";
import { createContext, useContext, useReducer } from "react";
export const ReducerContext = createContext([]);
export const ReducerProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <ReducerContext.Provider value={{ tasks: tasks, dispatch: dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};
export const useTasks = () => useContext(ReducerContext)