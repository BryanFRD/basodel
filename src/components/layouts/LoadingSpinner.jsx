import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = (props) => {
  let defaultProps = {animation: "grow"};
  Object.assign(defaultProps, props);
  
  return (
      <Spinner {...defaultProps} />
  );
}
export default LoadingSpinner;