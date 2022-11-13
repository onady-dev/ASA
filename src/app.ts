import express, { Request, Response } from "express";
import { Stock } from "./Stock";
import { crawl } from "./crawl";
import { sendMail } from "./mailer";

const app = express();

const stock = new Stock("카카오", 58600, "high");

const URL = "https://kr.investing.com/equities/kakao-corp";
const SELECTOR = "#__next > div > div > div > div > main > div > div > div:nth-child(2) > div > span";
let test = setInterval(crawl, 2000, URL, SELECTOR);
console.log(test);
// sendMail({
//   to: "onady.dev@gmail.com",
//   subject: "test mail",
//   text: "test mail text",
// });

app.get("/", async (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(3000);
