import Alert from "@mui/material/Alert";
export default function Notification({ message }) {
  return (
    <div className="notification">
      <Alert
        variant="filled"
        severity={
          message == "Edit done"
            ? "info"
            : message == "Delete done" ||
                message == "Delete all done" ||
                message == "Uncheck done"
              ? "error"
              : "success"
        }
      >
        {message}
      </Alert>
    </div>
  );
}
