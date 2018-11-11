import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $refreshToken: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      refreshToken: $refreshToken
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;
class ResetPassword extends Component {
  state = {
    newPassword: "",
    confirmPassword: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.token);
    return (
      <Mutation
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ ...this.state, refreshToken: this.props.token }}
      >
        {(resetPassword, { loading, error, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              this.setState({
                newPassword: "",
                confirmPassword: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Enter new password</h2>
              <Error error={error} />
              <label htmlFor="password">
                password
                <input
                  name="newPassword"
                  placeholder="Enter new password"
                  value={this.state.newPassword}
                  onChange={this.saveToState}
                  type="password"
                  required
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                  type="password"
                  required
                />
              </label>
              <button type="submit">Change Password</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default ResetPassword;
