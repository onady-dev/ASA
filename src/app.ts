import express, { Request, Response } from "express";
import { Stock } from "./Stock";
import { crawl } from "./crawl";
import { sendMail } from "./mailer";

const app = express();

const URL = "https://kr.investing.com/equities/kakao-corp";
const SELECTOR = "#__next > div > div > div > div > main > div > div > div:nth-child(2) > div > span";

const kakao = new Stock("카카오", 80000);
// const daehan = new Stock("대한항공", 34000);
setInterval(main, 6000, kakao);
// setInterval(main, 6000, daehan);

async function main(stock: Stock) {
  const result = await crawl(URL, SELECTOR);
  console.log(stock.name, stock.setValue, result);
  if (result === stock.setValue) {
    sendMail();
  }
}

// app.get("/", async (req: Request, res: Response) => {
//   res.send("hello");
// });

app.listen(3000);
