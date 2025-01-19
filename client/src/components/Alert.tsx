import Alert from "react-bootstrap/Alert";
import { AlertDismissibleProps } from "src/types";

const AlertDismissible: React.FC<AlertDismissibleProps> = ({
  active,
  message = "Something went wrong!",
}) => {
  if (!active) return null;

  return (
    <div className="position-absolute bottom-0">
      <Alert variant="danger" dismissible>
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    </div>
  );
};

export default AlertDismissible;
