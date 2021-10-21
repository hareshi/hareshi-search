import { infoPane, title, subtitle, divider, poster, detail, footNotes, hareshiBanner, hareshiBannerBlock } from "./info.module.css";

export default function Layout({ anilist: src }) {
  if (!src) {
    return <div></div>;
  }
  let naturalText1 = "";

  if (src.duration && src.episodes === 1) {
    naturalText1 += `${src.duration} นาที `;
  }
  if (src.episodes && src.format !== "MOVIE") {
    naturalText1 += `${src.episodes} ตอน `;
  }
  if (src.duration && src.episodes > 1) {
    naturalText1 += `${src.duration}-นาที `;
  }
  if (src.format) {
    naturalText1 += `${src.format.length > 3 ? src.format.toLowerCase() : src.format} `;
  }
  naturalText1 += " anime. ";

  let strStartDate =
    src.startDate && src.startDate.year && src.startDate.month && src.startDate.day
      ? `${src.startDate.year}-${src.startDate.month}-${src.startDate.day}`
      : null;
  let strEndDate =
    src.endDate && src.endDate.year && src.endDate.month && src.endDate.day
      ? `${src.endDate.year}-${src.endDate.month}-${src.endDate.day}`
      : null;

  let naturalText2 = "";
  if (strStartDate && strEndDate) {
    if (src.format === "MOVIE") {
      if (strStartDate === strEndDate) {
        naturalText2 += `ออกอากาศเมื่อ ${strStartDate}`;
      } else {
        naturalText2 += `ออกอากาศตั้งแต่ ${strStartDate} จนถึง ${strEndDate}`;
      }
    } else if (strStartDate === strEndDate) {
      naturalText2 += `ออกอากาศเมื่อ ${strStartDate}`;
    } else {
      naturalText2 += `ออกอากาศตั้งแต่ ${strStartDate} จนถึง ${strEndDate}`;
    }
  } else if (strStartDate) {
    if (src.format === "TV" || src.format === "TV_SHORT") {
      naturalText2 += `ออกอากาศไปเมื่อวันที่ ${strStartDate}`;
    }
  }

  naturalText2 += ". ";

  const synonyms = Array.from(
    new Set(
      [
        src.title.chinese || "",
        src.title.english || "",
        ...(src.synonyms || []),
        ...(src.synonyms_chinese || []),
      ]
        .filter((e) => e)
        .filter((e) => e !== src.title.native || e !== src.title.romaji)
    )
  )
    .sort()
    .map((title, i) => {
      return <div key={i}>{title}</div>;
    });

  let studio = [];
  if (src.studios && src.studios && src.studios.edges.length > 0) {
    studio = src.studios.edges.map((entry, i) => {
      if (entry.node.siteUrl) {
        return (
          <div key={i}>
            <a href={entry.node.siteUrl}>{entry.node.name}</a>
          </div>
        );
      } else {
        return <div key={i}>{entry.node.name}</div>;
      }
    });
  }

  let externalLinks = [];
  if (src.externalLinks && src.externalLinks.length > 0) {
    externalLinks = src.externalLinks.map((entry, i) => {
      return (
        <div key={i}>
          <a href={entry.url}>{entry.site}</a>
        </div>
      );
    });
  }
  console.log(src)
  return (
    <div className={infoPane}>
      <div>
        <div style={{ 'background-image': `url('${src.bannerImage || src.coverImage.large}')` }} className={hareshiBanner}>
        </div>
        <br></br>
        <a href={`//hareshi.net/browse/anime/${src.id}`} target="_blank">
        <div className={hareshiBannerBlock}>
          <p>ข้อมูลเพิ่มเติม,รับชม,ข้อมูลลิขสิทธ์</p>
          <p style={{ 'textAlign': 'right' }}>ดูเพิ่มเติมได้ที่ hareshi.net</p>
        </div>
          </a>

      </div>
      <div className={title}>{src.title.native}</div>
      <div className={subtitle}>{src.title.romaji}</div>
      <div className={divider}></div>
      <div className={detail}>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                {naturalText1}
                <br />
                {naturalText2}
              </td>
            </tr>
            <tr>
              <td>ชื่ออื่นๆ</td>
              <td>{synonyms}</td>
            </tr>
            <tr>
              <td>หมวดหมู่</td>
              <td>{src.genres.join(", ")}</td>
            </tr>
            <tr>
              <td>สตูดิโอ</td>
              <td>{studio}</td>
            </tr>
            <tr>
              <td>ลิงค์เพิ่มเติม</td>
              <td>{externalLinks}</td>
            </tr>
            {/* <tr>
              <td>ค่ายลิขสิทธ์ที่มี</td>
              <td>{externalLinks}</td>
            </tr> */}
          </tbody>
        </table>
        <div className={poster}>
          <a href={`//hareshi.net/browse/anime/${src.id}`} target="_blank">
            <img
              key={src.coverImage.large}
              src={src.coverImage.large}
              style={{ opacity: 0 }}
              onLoad={(e) => {
                e.target.style.opacity = 1;
              }}
            />
          </a>
        </div>
      </div>
      <div className={divider}></div>
      <div className={footNotes}>
        ข้อมูลการค้นหานำมาจาก <a href="https://trace.moe">trace.moe</a>
      </div>
    </div>
  );
}
