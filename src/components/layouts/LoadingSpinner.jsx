import { MDBSpinner } from "mdb-react-ui-kit";

const LoadingSpinner = (props) => {
  let {size = "2rem", color="#123456", className = ""} = props;
  return (
      <MDBSpinner size={size} color={color} className={className}>
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
  );
}
export default LoadingSpinner;