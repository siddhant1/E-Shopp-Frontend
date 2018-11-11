import ResetPassword from "../components/ResetPassword";

const Reset = props => (
  <div>
    <ResetPassword token={props.query.reset} />
  </div>
);

export default Reset;
