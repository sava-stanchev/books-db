import Alert from "react-bootstrap/Alert";

function AlertDismissible({
  activeAlert,
  alertMessage = "Something went wrong!",
}) {
  if (!activeAlert) return null;

  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>{alertMessage}</Alert.Heading>
    </Alert>
  );
}

export default AlertDismissible;
