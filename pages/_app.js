import "../styles/normalize.css";
import "../styles/global.css";
import App from "next/app";
import { init } from "@socialgouv/matomo-next";
class MyApp extends App {
  componentDidMount() {
    init({ url: 'https://sora.yue.sh', siteId: 4 });
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
export default MyApp;