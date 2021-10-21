import {
  searchBar,
  greet,
  searchBarReady,
  searchBarContent,
  logo,
  title,
  subtitle,
  formControls,
  imageUrlInput,
  anilistFilterInput,
  file,
  cutBordersBtn,
  searchBtn,
  iconSearch,
  iconCheck,
  iconCross,
} from "./search-bar.module.css";

export default function SearchBar({
  searchImageSrc,
  imageURL,
  imageURLInput,
  handleFileSelect,
  anilistFilter,
  setAnilistFilter,
  isCutBorders,
  setIsCutBorders,
  isSearching,
  search,
  searchImage,
}) {
  return (
    <div className={searchImageSrc ? searchBarReady : searchBar}>
      <div className={searchBarContent}>
        {!searchImageSrc && (
          <div className={greet}>
            วางลิงค์รูปภาพหรืออัพโหลดรูปภาพที่เป็นซีน/ตอนเพื่อทำการค้นหา
            <br/>
            <br/>
            <a href="/faq" style={{color: 'pink', paddingBottom: '10px'}}>[คำถามที่พบบ่อย]</a>
          </div>
        )}
        {searchImageSrc && (
          <a href="/">
            <div className={logo}>
              <div className={title}>HARESHI</div>
              <div className={subtitle}>-- ค้นหาอนิเมะ</div>
            </div>
          </a>
        )}
        <div className={formControls}>
          <form>
            <input
              type="url"
              pattern="https?://.+"
              required
              name="imageURL"
              className={imageUrlInput}
              placeholder="ลิงค์รูปภาพ"
              value={imageURL}
              onInput={imageURLInput}
            />
            <input type="submit" />
            <div className={file}>
              <input type="file" name="files[]" accept="image/*" onChange={handleFileSelect} />
            </div>
          </form>
          {searchImageSrc && (
            <>
              <input
                type="text"
                className={anilistFilterInput}
                placeholder="รหัสอนิเมะ"
                value={anilistFilter}
                onChange={(e) => {
                  setAnilistFilter(e.target.value);
                }}
              />
              <button className={cutBordersBtn} onClick={() => setIsCutBorders(!isCutBorders)}>
                <span className={`icon ${isCutBorders ? iconCheck : iconCross}`}></span> ตัตขอบ
              </button>
              <button
                className={searchBtn}
                disabled={isSearching}
                onClick={() => search(searchImage)}
              >
                <span className={iconSearch}></span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
