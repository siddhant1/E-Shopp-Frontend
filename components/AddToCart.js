import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($itemId: ID!) {
    addToCart(itemId: $itemId) {
      id
      quantity
    }
  }
`;

class AddToCart extends Component {
  render() {
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ itemId: this.props.itemId }}
      >
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    );
  }
}

export default AddToCart;
