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
    return await axios.get("https://www.yna.co.kr/sports/all");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function (i, elem) {
      ulList[i] = {
        title: $(this).find("strong.news-tl a").text(),
        url: $(this).find("strong.news-tl a").attr("href"),
        image_url: $(this).find("p.poto a img").attr("src"),
        image_alt: $(this).find("p.poto a img").attr("alt"),
        summary: $(this).find("p.lead").text().slice(0, -11),
        date: $(this).find("span.p-time").text(),
      };
    });
    const data = ulList.filter((n) => n.title);
    return data;
  })
  .then((res) => console.log(res));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/sample", sample);

module.exports = app;
