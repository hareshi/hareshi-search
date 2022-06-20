import "../styles/normalize.css";
import "../styles/global.css";
import App from "next/app";
import { init } from "@socialgouv/matomo-next";
class MyApp extends App {
  // componentDidMount() {
  //   init({ url: 'https://sora.0127007.xyz', siteId: 4 });
  // }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
export default MyApp;