import express, { Request, Response } from "express";
import { Stock } from "./Stock";
import { crawl } from "./crawl";
import { sendMail } from "./mailer";

const app = express();

const stock = new Stock("카카오", 58600);

const URL = "https://kr.investing.com/equities/kakao-corp";
const SELECTOR = "#__next > div > div > div > div > main > div > div > div:nth-child(2) > div > span";

setInterval(crawl, 2000, URL, SELECTOR);

app.get("/", async (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(3000);
