import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";
import { CURRENT_USER_QUERY } from "./User";
import { adopt } from "react-adopt";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
    }
  }
`;



class DeleteItem extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    //Filter the deleted Item
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        update={this.update}
        variables={{ id: this.props.id }}
        mutation={DELETE_ITEM_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {/* //WE CAN DO THIS TOO AND THIS IS COOL TO  */}
        {/* refetchQueries={[{ query: ALL_ITEMS_QUERY }]} */}
        {(deleteItem, { error, loading }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure ?")) {
                deleteItem().catch(e => {
                  alert(e.message);
                  console.log(e);
                });
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
