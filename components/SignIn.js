import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;
class SignIn extends Component {
  state = {
    password: "",
    email: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        mutation={SIGNIN_MUTATION}
        variables={this.state}
      >
        {(signin, { loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({
                email: "",
                password: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In for an account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                  type="text"
                  required
                />
              </label>
              <label htmlFor="password">
                password
                <input
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.saveToState}
                  type="password"
                  required
                />
              </label>

              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignIn;
