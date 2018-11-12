import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import SignIn from "./SignIn";
class PleaseSignIn extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading....</p>;
          if (!data.me)
            return (
              <div>
                Please Sign In
                <SignIn />
              </div>
            );
          return this.props.children;
        }}
      </Query>
    );
  }
}

export default PleaseSignIn;
