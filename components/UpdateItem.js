import gql from "graphql-tag";
import Router from "next/router";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Error from "./ErrorMessage";
import Form from "./styles/Form";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String
    $description: String
    $price: Int
    $id: ID!
  ) {
    updateItem(
      where: { id: $id }
      data: { title: $title, description: $description, price: $price }
    ) {
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {};
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
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading....</p>;
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={{ ...this.state, id: this.props.id }}
            >
              {(updateItem, { error, loading }) => (
                <Form
                  onSubmit={async e => {
                    e.preventDefault();
                    console.log(this.props);
                    const res = await updateItem();
                  }}
                >
                  Edit {data.item.title}
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        name="description"
                        id="description"
                        placeholder="description"
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav
                      {loading ? "ing" : "e"}
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
