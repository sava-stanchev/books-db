import Alert from "react-bootstrap/Alert";

function AlertDismissible({ activeAlert }) {
  if (activeAlert) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Damn! Something went wrong!</Alert.Heading>
        <p>Whatever you were doing.. try doing it again.</p>
      </Alert>
    );
  }

  return null;
}

export default AlertDismissible;
