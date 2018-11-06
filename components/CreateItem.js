import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        image: $image
        largeImage: $largeImage
        price: $price
      }
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "GQL",
    description: "THis is gql",
    price: 20000,
    image:
      "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiw5arJrMDeAhWCWysKHdwQAEUQjRx6BAgBEAU&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGraphQL&psig=AOvVaw2Y9uMuLcOWNUBz63DW7cHG&ust=1541613664468580",
    largeImage:
      "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiw5arJrMDeAhWCWysKHdwQAEUQjRx6BAgBEAU&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGraphQL&psig=AOvVaw2Y9uMuLcOWNUBz63DW7cHG&ust=1541613664468580"
  };
  handleChange = e => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    if (type)
      this.setState({
        [name]: val
      });
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { error, loading }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  value={this.state.title}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  value={this.state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  value={this.state.description}
                  name="description"
                  id="description"
                  placeholder="description"
                  required
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
