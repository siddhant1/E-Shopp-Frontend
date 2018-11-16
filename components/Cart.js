import React, { Component } from "react";
import CartStyles from "./styles/CartStyles";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import User from "./User";
import CartItem from "./CartItem";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { adopt } from "react-adopt";
import StripeTakeMoney from "./StripeCheckout";

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client {
      cartOpen
    }
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
class Cart extends Component {
  render() {
    return (
      <Composed>
        {({ user, toggleCart, localState }) => {
          const me = user.data.me;
          if (!me) return null;
          return (
            <CartStyles open={localState.data.cartOpen}>
              <header>
                <CloseButton onClick={toggleCart} title="close">
                  &times;
                </CloseButton>
                <Supreme>{me.name}'s Cart</Supreme>
                <p>
                  You have {me.cart.length} item
                  {me.cart.length === 1 ? "" : "s"} in your cart
                </p>
              </header>
              <ul>
                {me.cart.map(i => (
                  <CartItem key={i.id} cartItem={i} />
                ))}
              </ul>
              <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                <StripeTakeMoney>
                  <SickButton>Checkout</SickButton>
                </StripeTakeMoney>
              </footer>
            </CartStyles>
          );
        }}
      </Composed>
    );
  }
}

export default Cart;
