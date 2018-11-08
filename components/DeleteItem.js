import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (store, payload) => {
    const data = store.readQuery({ query: ALL_ITEMS_QUERY });
    //Filter the deleted Item
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    store.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        update={this.update}
        variables={{ id: this.props.id }}
        mutation={DELETE_ITEM_MUTATION}
      >
        {/* //WE CAN DO THIS TOO AND THIS IS COOL TO  */}
        {/* refetchQueries={[{ query: ALL_ITEMS_QUERY }]} */}
        {(deleteItem, { error, loading }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure ?")) {
                deleteItem();
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
