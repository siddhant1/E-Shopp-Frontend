import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });

    data.me.cart = data.me.cart.filter(
      c => c.id !== payload.data.removeFromCart.id
    );
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id
          }
        }}
      >
        {removeFromCart => (
          <BigButton
            onClick={() => removeFromCart().catch(e => e.message)}
            title="Delete Item"
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
