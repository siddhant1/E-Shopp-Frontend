import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import styled from "styled-components";
import RequestReset from "../components/RequestReset";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const signUp = props => (
  <Columns>
    <SignUp />
    <SignIn />
    <RequestReset />
  </Columns>
);

export default signUp;
