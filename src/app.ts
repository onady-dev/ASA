import express, { Request, Response } from "express";
import { crawl } from "./crawl";
const app = express();

const URL = "https://kr.investing.com/equities/kakao-corp";
const SELECTOR = "#__next > div > div > div > div > main > div > div > div:nth-child(2) > div > span";
setInterval(crawl, 2000, URL, SELECTOR);

app.get("/", async (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(3000);
