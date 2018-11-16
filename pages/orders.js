import Link from "next/link";
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";
import OrderList from "../components/OrderList";
const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
