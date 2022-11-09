"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawl = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const crawl = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // ❶ HTML 로드하기
    const resp = yield axios_1.default.get(url);
    // ❷ HTML을 파싱하고 DOM 생성하기
    const $ = cheerio_1.default.load(resp.data);
    // ❸ CSS 셀렉터로 원하는 요소 찾기
    const elements = $("#__next > div > div > div > div > main > div > div > div:nth-child(2) > div > span").text();
    // ➍ 찾은 요소를 순회하면서 요소가 가진 텍스트를 출력하기
    //   elements.each((idx, el) => {
    //     // ❺ text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
    //     console.log($(el).text());
    //   });
    console.log(elements, " @@@ ");
    return elements;
});
exports.crawl = crawl;
