import React, { Component } from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Link from "next/link";
import Head from "next/head";
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
class Pagination extends Component {
  render() {
    return (
      <Query
       query={PAGINATION_QUERY}
       >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading..</p>;
          if (error) return <p>Error</p>;
          const totalItems = data.itemsConnection.aggregate.count;
          const itemsOnOnePage = perPage;
          const pages = Math.ceil(totalItems / itemsOnOnePage);
          return (
            <PaginationStyles>
              <Head>
                <title>
                  Sick Fits - Page {this.props.page} of {pages}
                </title>
              </Head>
              <Link
                prefetch
                href={{
                  pathname: "items",
                  query: {
                    page:
                      this.props.page === 1
                        ? this.props.page
                        : this.props.page - 1
                  }
                }}
              >
                <a aria-disabled={this.props.page <= 1}>
                  <i className="fas fa-arrow-left" />
                </a>
              </Link>
              <p>
                Page {this.props.page} of {pages}
              </p>
              <p>Total {totalItems} items</p>
              <Link
                href={{
                  pathname: "items",
                  query: { page: this.props.page + 1 }
                }}
              >
                <a aria-disabled={this.props.page >= pages}>
                  <i className="fas fa-arrow-right" />
                </a>
              </Link>
              
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
