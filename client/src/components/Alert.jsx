import Alert from "react-bootstrap/Alert";

function AlertDismissible({
  activeAlert,
  alertMessage = "Something went wrong!",
}) {
  if (!activeAlert) return null;

  return (
    <div className="position-absolute bottom-0">
      <Alert variant="danger" dismissible>
        <Alert.Heading>{alertMessage}</Alert.Heading>
      </Alert>
    </div>
  );
}

export default AlertDismissible;
