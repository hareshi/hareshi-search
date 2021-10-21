import Layout from "../components/layout";
import {
  container,
  page,
  pageHeader,
  section,
  sectionHeader,
  sectionItem,
} from "../components/layout.module.css";

const FAQ = () => (
  <Layout title="FAQ">
    <div className={`${container} ${page}`}>
      <div className={pageHeader}>คำถามที่พบบ่อย</div>
      <div className={section}>
        <div className={sectionHeader}>ทำไมถึงไม่เจอผลการค้นหาอะไรเลย?</div>
        <p>
          เหตุผลที่เป็นไปได้:
          <br />
          1.รูปภาพของคุณนั้นไม่ได้มาจากอนิเมะ
          <br />
          2.ฝั่งเราเองยังไม่มีข้อมูลเกี่ยวกับเรื่องนี้
          <br />
          3.รูปภาพนั้นถูกดัดแปลงมาแล้ว 
          <br />
          4.ระบบการค้นหานั้นจะหาจากสีที่คล้ายมากที่สุดเพราะฉนั้นการที่สีรูปภาพเพี้ยนหรือถูกแก้ไขสีอาจจะทำให้การค้นหาเปลี่ยนแปลงได้
          <br />
          5.รูปภาพที่คุณค้นหาถูกตัต (เป็นภาพไม่เต็ม)
          <br />
          6.รูปภาพที่คุณค้นหาถูกกลับด้านหมุนภาพ ทำให้ไม่สามารถค้นหาได้
          <br />
          7.มีตัวอักศรอยู่บนรูปภาพมากเกินไป หรือ มี UI อะไรสักอย่างมาบัง
          <br />
          8.รูปภาพที่คุณค้นหานั้นเล็กเกินไป หรือาจจะมืดเกินไป หรือมีสีแปลกเกินไป
          <br />
          9.คุณไม่สามารถเอารูปจริงๆมาค้นหาได้ เพราะนี้เป็นเว็บไซต์ค้นหาอนิเมะ
          <br />
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>ตัวอย่างการอัพโหลดรูปมาแบบไม่ถูกต้อง</div>
        <br />
        <h4>มีขอบเพิ่มเข้ามา</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/border-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          ไม่ถูกต้อง
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/border-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ถูกต้อง เพราะเป็นรูปภาพเต็มๆ
        </div>
        <p style={{ clear: "both" }}>
          ในเคสนี้มันมีขอบด้านล่างและด้านบนอยู่ทำให้ไม่สามารถค้นหาได้ โปรดตัตขอบออกก่อนค้นหา
        </p>
        <br />
        <h4>รูปภาพไม่เต็ม</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/cropped-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          ไม่ถูกต้อง
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/cropped-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ถูกต้อง เพราะเป็นรูปภาพเต็มๆ
        </div>
        <p style={{ clear: "both" }}>
          การตัตรูปภาพบางส่วนออกนั้นทำให้การค้นหานั้นเพี้ยนทำให้ผลลัพธ์ไม่ถูกต้อง
        </p>
        <br />
        <h4>รูปภาพที่ถูกกลับด้าน</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/flipped-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          ไม่ถูกต้อง
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/flipped-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ถูกต้อง เพราะเป็นรูปภาพต้นฉบับ
        </div>
        <p style={{ clear: "both" }}>
          รูปภาพนี้ถูกแคปมาจาก{" "}
          <a href="https://www.youtube.com/watch?v=TUoWYoTWcnA&feature=youtu.be&t=2m59s">
            AMV - Animegraphy 2015
          </a>{" "}
          และมันถูกกลับด้านทำให้ไม่สามารถค้นหาได้
        </p>
        <br />
        <h4>สีเพี้ยน</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/tinted-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          สีเพียน
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/tinted-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <p style={{ clear: "both" }}>
          รูปภาพแบบนั้นสีเพี้ยนทำให้ค้นหายากมาก แนะนำให้เอารูปต้นฉบับมาก่อนละค่อยค้นหา
        </p>
        <br />
        <h4>อนิเมะเก่ามากๆ</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/old-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รูปภาพตัวอย่าง
        </div>
        <p style={{ clear: "both" }}>อนิเมะเก่าแบบนี้ไม่มีในฐานข้อมูลจ้า</p>
        <br />
        <h4>ไม่ได้มาจากในอนิเมะ</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/notanime-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รูปภาพตัวอย่าง
        </div>
        <p style={{ clear: "both" }}>
         รูปภาพนี้เป็นภาพวาดไม่ได้มาจากอนิเมะไม่สามารถหาได้
        </p>
        <br />
        <h4>ไม่ใช้อนิเมะญี่ปุ่น</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/nonjapanese-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รูปภาพตัวอย่าง
        </div>
        <p style={{ clear: "both" }}>ทอมแอนด์เจอร์รี่ไม่ได้เป็นอนิเมะญี่ปุ่น</p>
        <br />
        <h4>รูปภาพที่มืดมากๆ</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/dark-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รูปภาพตัวอย่าง
        </div>
        <p style={{ clear: "both" }}>
          มืดขนาดนี้ผมเองก็มองไม่เห็น
        </p>
        <br />
        <h4>รูปที่เล็กมากๆ</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/lowres-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รูปภาพตัวอย่าง
        </div>
        <p style={{ clear: "both" }}>
          รูปในตัวอย่างนี้เล็กมากๆแนะนำขนาด 320x180px ขึ้นไป
        </p>
        <br />
      </div>
      <div className={section}>
        <div className={sectionHeader}>ตัวอย่างรูปภาพที่พออนุโลมได้</div>
        <h4>ขนาดแตกต่างกันเล็กน้อย</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/distorted-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รับได้
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/distorted-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <p style={{ clear: "both" }}></p>
        <br />
        <h4>มีซับเล็กน้อย</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/subtitles-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รับได้
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/subtitles-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <p style={{ clear: "both" }}></p>
        <br />
        <h4>รูปภาพจากไฟล์ GIF</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/gif-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รับได้
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/gif-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <p style={{ clear: "both" }}>ถ้าสีไม่ได้เพี้ยนมากก็พอรับได้</p>
        <br />
        <h4>รูปวาดที่มีในอนิเมะ</h4>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/draw2-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รับได้
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/draw2-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/draw4-bad.jpg"
            style={{ maxWidth: "288px", maxHeight: "162px", verticalAlign: "middle" }}
          />
          <br />
          รับได้
        </div>
        <div style={{ float: "left", textAlign: "center", width: "288px" }}>
          <img
            alt=""
            src="/img/draw4-good.jpg"
            style={{
              float: "left",
              maxWidth: "288px",
              maxHeight: "162px",
              verticalAlign: "middle",
            }}
          />
          <br />
          ต้นฉบับ
        </div>
        <p style={{ clear: "both" }}>
          รูปภาพนั้นไม่จำเป็นต้องแคปมากจากอนิเมะเสมอไป แต่สามารถวาดให้คล้ายๆกันหรือเหมือนกันสามารถใช้งานค้นหาได้
        </p>
        <br />
      </div>
      {/* <div className={section}>
        <div className={sectionHeader}>How do I search for a more accurate result?</div>
        <p>
          Crop your screenshot to 16:9 or 4:3 before searching. Remove any extra borders in
          screencap (if any). By default, it crops the image to 16:9, if you upload a 16:10
          screenshot, it should be cropped automatically. If the position is incorrect, you can drag
          the image and adjust the crop position. If your image is tinted, you are out of luck.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>What anime are being indexed?</div>
        <p>
          Most Japanese anime since 2000 are indexed, plus some popular anime in 1990s, and little
          anime before 1990. A list of anime are incomplete in index at this stage, including
          Jewelpet, Yu-Gi-Oh!, Dragon Ball, Crayon Shin-chan, Doraemon, Pokemon, Detective Conan,
          Chibi Maruko-chan.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>Why can't I preview the search result?</div>
        <p>
          Some anime are being removed or relocated, so some of the previews may go offline. The
          preview uses a considerable amount of network bandwidth, it would take some time to load
          if you have a slow connection.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>Why are the anime chinese-subbed?</div>
        <p>
          I am still collecting raw anime, and it would take a number of powerful servers several
          months to complete. It will switch to the new dataset once it is ready. The current
          dataset uses Chinese-subbed anime because the current index is provided by some Asian
          users.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>Cannot open the website!</div>
        <p>
          trace.moe requires TLS 1.2 to work. Try upgrading or use another browser. Primary
          supported browsers are Chrome and Firefox. You may also try disabling some of your
          browsers extensions/add-ons.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>How can I watch the entire anime?</div>
        <p>
          You cannot do that. This website is not intended for watching anime. If you wish to watch
          the anime, you may check which TV channel is broadcasting the anime in your country. For
          those which has finished airing, consider buying or renting the original Blu-ray/DVDs.
        </p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>How can I share the search result?</div>
        <p>You can only have a sharable URL if you search by image URL.</p>
      </div>
      <div className={section}>
        <div className={sectionHeader}>How to add trace.moe to Image Search Options</div>
        <p>
          If you prefer to use trace.moe with{" "}
          <a href="https://chrome.google.com/webstore/detail/image-search-options/kljmejbpilkadikecejccebmccagifhl">
            Image Search Options
          </a>
          , go to settings and add this:
        </p>
        <pre>https://trace.moe/?url=</pre>
      </div> */}
    </div>
  </Layout>
);
export default FAQ;
