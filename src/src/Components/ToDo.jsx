export default function ToDo({
  id,
  name,
  completed,
  handleDelete,
  handleEdit,
  handleCheck,
}) {
  return (
    <div className="task-item">
      <li
        className="task-name"
        style={{
          backgroundColor: `${completed ? "#bbb" : "#eee"}`,
          textDecoration: `${completed ? "line-through" : ""}`,
        }}
      >
        {name}
      </li>
      <div>
        <button
          style={{ border: "2px solid #ee1c1c", color: "#ee1c1c" }}
          onClick={() => {
            handleDelete(id);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          style={{ border: "2px solid #2196F3", color: "#2196F3" }}
          onClick={() => {
            handleEdit(id, name);
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button
          style={{
            border: "2px solid teal",
            color: `${completed ? "white" : "teal"}`,
            backgroundColor: `${completed ? "teal" : "white"}`,
          }}
          onClick={() => handleCheck(id)}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
}
