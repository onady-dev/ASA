var express = require("express");
var app = express();
var morgan = require("morgan");
var sample = require("./api/sample");
var cheerio = require("cheerio");
var axios = require("axios");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const getHtml = async () => {
  try {
    return await axios.get("https://kr.investing.com/equities/korean-air-lines-co");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
    // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
    const $ = cheerio.load(html.data);
    const data = {
      mainContents: $(
        "#__next > div > div > div > div.grid.gap-4.tablet:gap-6.grid-cols-4.tablet:grid-cols-8.desktop:grid-cols-12.grid-container--fixed-desktop.general-layout_main__3tg3t > main > div > div.instrument-header_instrument-header__1SRl8.mb-5.bg-background-surface.tablet:grid.tablet:grid-cols-2 > div:nth-child(2) > div.instrument-price_instrument-price__3uw25.flex.items-end.flex-wrap.font-bold > span"
      )
        .html()
        // 불필요한 \n과 \t 제거
        .replace(/[\n\t]/g, ""),
    };
    return data;
  })
  .then((res) => console.log(res));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/sample", sample);

module.exports = app;
