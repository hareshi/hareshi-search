import Layout from "../components/layout";
import { container, page, pageHeader } from "../components/layout.module.css";

const Custom404 = () => (
  <Layout title="ไม่พบหน้านี้">
    <div className={`${container} ${page}`}>
      <div className={pageHeader}>ไม่พบหน้านี้</div>
    </div>
  </Layout>
);
export default Custom404;
