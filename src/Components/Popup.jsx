import { useState } from "react";

export default function ({
  handleShow,
  handleDeleteConfirm,
  handleEditConfirm,
  id,
  type,
  inputValue,
}) {
  const [nameInput, setNameInput] = useState(inputValue);
  return (
    <>
      <div className="popup-box">
        {type == "edit" ? (
          <>
            <h2>Edit Task</h2>
            <input
              required
              id="name"
              name="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <label htmlFor="name">Your Task</label>
          </>
        ) : (
          <>
            <h2 style={{ margin: "10px 0" }}>
              Are you sure you want to delete the task?
            </h2>
            <p>You cannot undo deletion if you select the delete button.</p>
          </>
        )}
        <button
          className={type == "edit" ? "edit-btn" : "delete-btn"}
          style={{ color: `${type == "edit" ? "#2196F3" : "#F44336"}` }}
          onClick={() => {
            type == "edit"
              ? handleEditConfirm(id, nameInput)
              : handleDeleteConfirm(id);
          }}
        >
          {type == "edit" ? "Edit" : "Yes, delete"}
        </button>
        <button
          className={type == "edit" ? "edit-btn" : "delete-btn"}
          style={{ color: `${type == "edit" ? "#2196F3" : "#F44336"}` }}
          onClick={() => handleShow(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
