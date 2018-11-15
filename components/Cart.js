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
class Cart extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (!me) return null;
          return (
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <Query query={LOCAL_STATE_QUERY}>
                  {({ data }) => (
                    <CartStyles open={data.cartOpen}>
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
                        <SickButton>Checkout</SickButton>
                      </footer>
                    </CartStyles>
                  )}
                </Query>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default Cart;
