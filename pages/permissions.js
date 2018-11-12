import Permission from "../components/Permission";
import PleaseSignIn from "../components/PleaseSignIn";
const PermissionsPage = props => (
  <div>
    <PleaseSignIn>
      <Permission />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
