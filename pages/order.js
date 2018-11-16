import Link from "next/link";
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";
import Order from "../components/Order";
const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;
