import Head from "next/head";
import Link from "next/link";
import { footer, container, section, sectionHeader, sectionItem } from "./footer.module.css";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#332228" />
        <meta
          name="description"
          content="hareshi search ค้นหาอนิเมะโดยใช้รูปภาพจากตอนนั้นๆ สามารถบอกได้ว่าตอนที่เท่าไรและนาทีที่เท่าไร แบบแม่นยำ"
        />
        <title>{title} | Hareshi</title>
        <link rel="icon" type="image/png" href="https://hareshi.net/favicon.png" />
        <link rel="icon" type="image/png" href="https://hareshi.net/favicon128.png" sizes="128x128" />
      </Head>
      {children}
      <footer className={footer}>
        <div className={container}>
          <p><a href="https://hareshi.net" target="_blank">เว็บไซต์หลัก hareshi.net</a></p>
          <p><a href="https://github.com/soruly/trace.moe-api" target="_blank">บริการค้นหาอนิเมะ ให้บริการโดย trace.moe</a></p>
          <p><a href="https://forum.hareshi.net" target="_blank">ฟอรั่ม</a></p>
        </div>
      </footer>
      <script src="/js/analytics.js" defer></script>
    </>
  );
}
