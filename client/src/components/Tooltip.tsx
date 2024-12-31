import Tooltip from "react-bootstrap/Tooltip";

const renderTooltip = (tooltipText: string): React.ReactNode => (
  <Tooltip id="button-tooltip">{tooltipText}</Tooltip>
);

export default renderTooltip;
