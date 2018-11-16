import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

class StripeTakeMoney extends Component {
  onToken = async (res, order) => {
    NProgress.start();
    const Rorder = await order({
      variables: {
        token: res.id
      }
    });
    Router.push({
      pathname: "/order",
      query: { id: Rorder.data.createOrder.id }
    });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {order => (
              <StripeCheckout
                amount={me.cart.length && calcTotalPrice(me.cart) * 100}
                name="Checkout 🛒"
                description="Thanks for shopping with us"
                stripeKey="pk_test_qrf7of6Av0tKOZGubpKdK1xu"
                currency="INR"
                email={me.email}
                token={res => this.onToken(res, order)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default StripeTakeMoney;
