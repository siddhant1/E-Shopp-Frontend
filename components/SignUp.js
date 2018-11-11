import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      name
      email
    }
  }
`;
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation 
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      mutation={SIGNUP_MUTATION} 
      variables={this.state}>
        {(signup, { loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({
                name: "",
                email: "",
                password: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for an account</h2>
              <Error error={error} />
              <label htmlFor="name">
                name
                <input
                  name="name"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.saveToState}
                  type="text"
                  required
                />
              </label>
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

              <button type="submit">Sign Up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignUp;
