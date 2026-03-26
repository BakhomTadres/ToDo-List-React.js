export default function tasksReducer(currentTasks, action) {
  switch (action.type) {
    case "add": {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...currentTasks,
          {
            id: action.payload.id,
            name: action.payload.title,
            isCompleted: false,
          },
        ]),
      );
      return [
        ...currentTasks,
        {
          id: action.payload.id,
          name: action.payload.title,
          isCompleted: false,
        },
      ];
    }
    case "check": {
      const tasksCheck = currentTasks.map((t) => {
        if (t.id == action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(tasksCheck));
      return tasksCheck;
    }
    case "delete": {
      const tasksFilter = currentTasks.filter((task) => {
        return task.id !== action.payload.id;
      });
      localStorage.setItem("tasks", JSON.stringify(tasksFilter));
      return tasksFilter;
    }
    case "edit": {
      let tasksEdit = currentTasks.map((t) => {
        if (t.id == action.payload.id) {
          t.name = action.payload.name;
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(tasksEdit));
      return tasksEdit;
    }
    case "getTasks": {
      const savedData = JSON.parse(localStorage.getItem("tasks"));
      return savedData;
    }
    case "deleteAll": {
      return [];
    }
    case "localStorageTrue": {
      return currentTasks;
    }
    case "localStorageFalse": {
      return [];
    }
  }
}
