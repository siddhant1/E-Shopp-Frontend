import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];
const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      name
      email
      permissions
    }
  }
`;
class Permission extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => (
          <div>
            <Error error={error} />
            <div>
              {data.users && (
                <>
                  <h2>Manage Permissions</h2>
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {possiblePermissions.map(permission => (
                          <th key={permission}>{permission}</th>
                        ))}
                        <th>👌</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.map(user => (
                        <UserPermissions key={user.id} user={user} />
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </div>
        )}
      </Query>
    );
  }
}

class UserPermissions extends React.Component {
  state = {
    permissions: this.props.user.permissions
  };

  handleChange = e => {
    let updatedPermissions = [...this.state.permissions];
    if (e.target.checked) {
      updatedPermissions.push(e.target.value);
    } else {
      updatedPermissions = updatedPermissions.filter(p => {
        return p !== e.target.value;
      });
    }
    this.setState({
      permissions: updatedPermissions
    });
  };
  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id
        }}
      >
        {(updatePermission, { data, loading, error }) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => {
                return (
                  <td key={permission}>
                    <label htmlFor={`${user.id}-permission-${permission}`}>
                      <input
                        id={`${user.id}-permission-${permission}`}
                        type="checkbox"
                        value={permission}
                        checked={this.state.permissions.includes(permission)}
                        onChange={this.handleChange}
                      />
                    </label>
                  </td>
                );
              })}
              <td>
                <SickButton disabled={loading} onClick={updatePermission}>
                  Upda{loading ? "ting" : "te"}
                </SickButton>
              </td>
            </tr>
          );
        }}
      </Mutation>
    );
  }
}
export default Permission;
