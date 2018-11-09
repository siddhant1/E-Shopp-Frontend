import gql from "graphql-tag";
import Router from "next/router";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import Form from "./styles/Form";
import { ALL_ITEMS_QUERY } from "./Items";

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
    title: "",
    description: "",
    price: 0,
    image: "",
    largeImage: ""
  };
  handleChange = e => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    if (type)
      this.setState({
        [name]: val
      });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Sick-fits");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dv95rctxg/image/upload",
      {
        method: "POST",
        body: data
      }
    ).then(d => d.json());
    this.setState({
      image: res.secure_url,
      largeImage: res.eager[0].secure_url
    });
  };
  render() {
    return (
      <Mutation
        refetchQueries={[{ query: ALL_ITEMS_QUERY }]}
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { error, loading }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              Router.push({
                pathname: "/items"
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="Image">
                Upload Image
                <input
                  type="File"
                  name="Image"
                  id="Image"
                  placeholder="Upload Image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && <img width="200" src={this.state.image} />}
              </label>
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
