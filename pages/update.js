import UpdateItem from "../components/UpdateItem";
import PleaseSignIn from "../components/PleaseSignIn";
const Update = ({ query }) => (
  <div>
    <PleaseSignIn>
      <UpdateItem id={query.id} />
    </PleaseSignIn>
  </div>
);

export default Update;
