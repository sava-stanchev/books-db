import Alert from "react-bootstrap/Alert";

function AlertDismissible({ activeAlert, alertMessage }) {
  if (activeAlert) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>{alertMessage || "Something went wrong!"}</Alert.Heading>
      </Alert>
    );
  }

  return null;
}

export default AlertDismissible;
