import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Result from "../components/result";
import Player from "../components/player";
import Info from "../components/info";
import SearchBar from "../components/search-bar";
import {
  dropTarget,
  dropping,
  main,
  mainReady,
  searchImageDisplay,
  messageTextLabel,
  detail,
  originalImageDisplay,
  resultList,
  wrap,
  playerInfoPane,
} from "../components/index.module.css";

const NEXT_PUBLIC_API_ENDPOINT = 'https://api.trace.moe';
const NEXT_PUBLIC_ANILIST_ENDPOINT = 'https://graphql.anilist.co';
const NEXT_PRIVATE_ROXY_MERGE_API = 'https://roxy.hareshi.net/api/v1/anime/merge/'

const Index = () => {
  const [dropTargetText, setDropTargetText] = useState("");
  const [isCutBorders, setIsCutBorders] = useState(true);
  const [anilistFilter, setAnilistFilter] = useState();
  const [messageText, setMessageText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [searchImageSrc, setSearchImageSrc] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState();
  const [showNSFW, setshowNSFW] = useState(false);
  const [anilistInfo, setAnilistInfo] = useState();
  const [playerSrc, setPlayerSrc] = useState();
  const [playerTimeCode, setPlayerTimeCode] = useState("");
  const [playerFileName, setPlayerFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("url")) {
      setImageURL(searchParams.get("url"));
      setSearchImageSrc(`/image-proxy?url=${encodeURIComponent(searchParams.get("url"))}`);
    }
    document.addEventListener(
      "paste",
      (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        const item = Array.from(items).find((e) => e.type.startsWith("image"));
        if (!item) return;
        setSearchImageSrc(URL.createObjectURL(item.getAsFile()));
        e.preventDefault();
      },
      false
    );

    window.onerror = function (message, source, lineno, colno, error) {
      if (typeof ga === "function") {
        ga("send", "event", "error", error ? error.stack : message);
      }
    };
  }, []);

  const imageURLInput = (e) => {
    e.preventDefault();
    if (!e.target.value.length) {
      setImageURL("");
      history.replaceState(null, null, "/");
      return;
    }
    if (e.target.parentNode.checkValidity()) {
      setImageURL(e.target.value);
      setSearchImageSrc(`/image-proxy?url=${encodeURIComponent(e.target.value)}`);
      history.replaceState(null, null, `/?url=${encodeURIComponent(e.target.value)}`);
    } else {
      e.target.parentNode.querySelector("input[type=submit]").click();
    }
  };

  const handleFileSelect = function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (imageURL) {
      setImageURL();
      history.replaceState(null, null, "/");
    }
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (!file || !file.type.match("image.*")) {
      setDropTargetText("ไฟล์นี้ไม่ใช้รูปภาพ โปรดแนบรูปภาพ");
      return "ไฟล์นี้ไม่ใช้รูปภาพ โปรดแนบรูปภาพ";
    }
    setDropTargetText("");
    e.target.classList.remove(dropping);
    setSearchImageSrc(URL.createObjectURL(file));
    return "";
  };

  useEffect(async () => {
    if (!searchImageSrc) return;
    setIsLoading(true);
    setMessageText("กำลังโหลดรูปภาพ...");
    const image = new Image();
    image.onload = (e) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      ctx.drawImage(e.target, 0, 0);
      canvas.toBlob(
        function (blob) {
          setIsLoading(false);
          setSearchImage(blob);
          search(blob);
        },
        "image/jpeg",
        0.8
      );
    };
    image.onerror = () => {
      setMessageText("เกิดข้อผิดพลาดในการค้นหา");
    };
    image.src = searchImageSrc;
  }, [searchImageSrc]);

  const search = async (imageBlob) => {
    setMessageText("กำลังค้นหา...");
    setSearchResult([]);
    setSelectedResult();
    setAnilistInfo();
    setPlayerSrc();
    setPlayerFileName("");
    setPlayerTimeCode("");
    setIsSearching(true);
    const startSearchTime = performance.now();
    const formData = new FormData();
    formData.append("image", imageBlob);
    const queryString = [
      isCutBorders ? "cutBorders" : "",
      anilistFilter ? `anilistID=${anilistFilter}` : "",
    ].join("&");
    const res = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}/search?${queryString}`, {
      method: "POST",
      body: formData,
    });
    setIsSearching(false);

    if (res.status === 429) {
      setMessageText("คุณค้นหาบ่อยเกินไป, โปรดลองใหม่ภายหลัง.");
      return;
    }
    if (res.status >= 400) {
      setMessageText(`เกิดข้อผิดพลาด: ${(await res.json()).error}`);
      return;
    }
    const { frameCount, result } = await res.json();

    setMessageText(
      `ค้นหาจากทั้งหมด ${frameCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} เฟรม ใช้เวลา ${(
        (performance.now() - startSearchTime) /
        1000
      ).toFixed(2)} วินาที`
    );

    if (result.length === 0) {
      setMessageText("แง้ ไม่เจอผลลัพธ์ใดๆเลย");
      return;
    }

    const topResults = result.slice(0, 5);

    const response = await fetch(NEXT_PUBLIC_ANILIST_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        query: `query ($ids: [Int]) {
            Page(page: 1, perPage: 50) {
              media(id_in: $ids, type: ANIME) {
                id
                title {
                  native
                  romaji
                  english
                }
                type
                format
                status
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                season
                episodes
                duration
                source
                coverImage {
                  large
                  medium
                }
                bannerImage
                genres
                synonyms
                studios {
                  edges {
                    isMain
                    node {
                      id
                      name
                      siteUrl
                    }
                  }
                }
                isAdult
                externalLinks {
                  id
                  url
                  site
                }
                siteUrl
              }
            }
          }
          `,
        variables: { ids: topResults.map((e) => e.anilist) },
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status >= 400) {
      setMessageText("เกิดข้อผิดพลาดในการดึงข้อมูลอนิเมะ โปรดลองใหม่ภายหลัง");
      const topResultsWithoutAnlist = topResults.map((entry) => {
        const id = entry.anilist;
        entry.anilist = {
          id,
          title: { native: id },
          isAdult: false,
        };
        entry.playResult = () => {
          setSelectedResult(entry);
          setPlayerSrc(entry.video);
          setPlayerFileName(entry.filename);
          setPlayerTimeCode(entry.from);
        };
        return entry;
      });
      setSearchResult(topResultsWithoutAnlist);
      topResultsWithoutAnlist[0].playResult();
      return;
    }
    const anilistData = (await response.json()).data.Page.media;

  //   const response = await fetch(NEXT_PRIVATE_ROXY_MERGE_API + , { 
  //     method: 'GET', 

  // })

    const topResultsWithAnlist = topResults.map((entry) => {
      entry.anilist = anilistData.find((e) => e.id === entry.anilist);
      entry.playResult = () => {
        setSelectedResult(entry);
        setAnilistInfo(entry.anilist);
        setPlayerSrc(entry.video);
        setPlayerFileName(entry.filename);
        setPlayerTimeCode(entry.from);
      };
      return entry;
    });
    setSearchResult(topResultsWithAnlist);

    if (!topResultsWithAnlist[0].anilist.isAdult) {
      topResultsWithAnlist[0].playResult();
    }
  };

  return (
    <Layout title="ค้นหาอนิเมะ">
      <Head>
        <meta name="viewport" content="width=650, viewport-fit=cover" />
        <meta name="theme-color" content="#f9f9fb" />
        <meta itemprop="name" content="บริการค้นหาอนิเมะ" />
        <meta
          itemprop="description"
          content="hareshi search ค้นหาอนิเมะโดยใช้รูปภาพจากตอนนั้นๆ สามารถบอกได้ว่าตอนที่เท่าไรและนาทีที่เท่าไร แบบแม่นยำ"
        />
        <meta itemprop="image" content="https://trace.moe/favicon128.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@soruly" />
        <meta name="twitter:title" content="บริการค้นหาอนิเมะ" />
        <meta
          name="twitter:description"
          content="hareshi search ค้นหาอนิเมะโดยใช้รูปภาพจากตอนนั้นๆ สามารถบอกได้ว่าตอนที่เท่าไรและนาทีที่เท่าไร แบบแม่นยำ"
        />
        <meta name="twitter:creator" content="@soruly" />
        <meta name="twitter:image" content="<%= ogImage %>" />
        <meta
          name="twitter:image:alt"
          content="hareshi search ค้นหาอนิเมะโดยใช้รูปภาพจากตอนนั้นๆ สามารถบอกได้ว่าตอนที่เท่าไรและนาทีที่เท่าไร แบบแม่นยำ"
        />

        <meta property="og:title" content="บริการค้นหาอนิเมะ" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://search.hareshi.net" />
        <meta property="og:image" content="<%= ogImage %>" />
        <meta
          property="og:description"
          content="hareshi search ค้นหาอนิเมะโดยใช้รูปภาพจากตอนนั้นๆ สามารถบอกได้ว่าตอนที่เท่าไรและนาทีที่เท่าไร แบบแม่นยำ"
        />
        <meta property="og:site_name" content="search.hareshi.net" />

        <link rel="dns-prefetch" href={NEXT_PUBLIC_API_ENDPOINT} />
      </Head>
      {/* inject target for WebExtension */}
      <img
        id="originalImage"
        src=""
        style={{ display: "none" }}
        onLoad={(e) => {
          setSearchImageSrc(e.target.src);
        }}
      />
      {/* legacy element for not breaking WebExtension */}
      <input id="autoSearch" type="checkbox" style={{ display: "none" }}></input>

      <div className={searchImageSrc ? mainReady : main}>
        {!searchImageSrc && (
          <div
            className={dropTarget}
            onDrop={handleFileSelect}
            onDragOver={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.dataTransfer.dropEffect = "copy";
            }}
            onDragEnter={(e) => {
              e.target.classList.add(dropping);
              setDropTargetText("Drop image here");
            }}
            onDragLeave={(e) => {
              e.target.classList.remove(dropping);
            }}
          >
            {dropTargetText}
          </div>
        )}
        <SearchBar
          searchImageSrc={searchImageSrc}
          imageURL={imageURL}
          imageURLInput={imageURLInput}
          handleFileSelect={handleFileSelect}
          anilistFilter={anilistFilter}
          setAnilistFilter={setAnilistFilter}
          isCutBorders={isCutBorders}
          setIsCutBorders={setIsCutBorders}
          isSearching={isSearching}
          search={search}
          searchImage={searchImage}
        ></SearchBar>

        {searchImageSrc && (
          <div className={wrap}>
            <div className={resultList}>
              <div className={searchImageDisplay}>
                <div className={detail}>รูปภาพที่คุณค้นหา</div>
                <img
                  className={originalImageDisplay}
                  src={searchImageSrc}
                  crossOrigin="anonymous"
                  onError={() => {
                    setMessageText("เกิดข้อผิดพลาดในการโหลดรูปภาพ");
                  }}
                />
                <div className={messageTextLabel}>{messageText}</div>
              </div>
              {searchResult
                .filter((e) => showNSFW || !e.anilist.isAdult)
                .map((searchResult, i) => {
                  return (
                    <Result
                      key={i}
                      searchResult={searchResult}
                      active={searchResult === selectedResult}
                    ></Result>
                  );
                })}
              {searchResult.find((e) => e.anilist.isAdult) && (
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={(e) => {
                      setshowNSFW(!showNSFW);
                    }}
                  >
                    {showNSFW ? "Hide" : "Show"}{" "}
                    {searchResult.filter((e) => e.anilist.isAdult).length} NSFW results
                  </button>
                </div>
              )}
            </div>

            <div className={playerInfoPane}>
              <Player
                src={playerSrc}
                timeCode={playerTimeCode}
                fileName={playerFileName}
                isLoading={isLoading}
                isSearching={isSearching}
                onDrop={handleFileSelect}
              ></Player>
              {!isSearching && <Info anilist={anilistInfo}></Info>}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
<style jsx global>{`
html,
body,* {
   @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@300&display=swap');
   font-family: 'Noto Serif Thai', serif;
}
`}</style>
export default Index;
