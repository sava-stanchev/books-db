import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible({ activeAlert }) {
  const [show, setShow] = useState(activeAlert);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Damn! Something went wrong!</Alert.Heading>
        <p>Whatever you were doing.. try doing it again.</p>
      </Alert>
    );
  }

  return null;
}

export default AlertDismissible;
