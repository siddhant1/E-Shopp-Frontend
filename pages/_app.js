import App, { Container } from "next/app";
import Page from "../components/Page";

class MyApp extends App {
  render() {
    //It recieves the component to render
    const { Component } = this.props;
    return (
      <div>
        <Page>
          <Component />
        </Page>
      </div>
    );
  }
}
export default MyApp;
