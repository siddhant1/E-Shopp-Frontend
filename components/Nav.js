import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "../components/User";
import SignOut from "./SignOut";
import Cart, { TOGGLE_CART_MUTATION } from "./Cart";
import { Mutation } from "react-apollo";
const Nav = props => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Items</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <SignOut />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => <button onClick={toggleCart}>Cart</button>}
            </Mutation>
            {/* <Cart/> */}
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
