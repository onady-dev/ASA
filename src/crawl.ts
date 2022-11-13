import axios from "axios";
import cheerio from "cheerio";

export const crawl = async (url: string, selector: string) => {
  // ❶ HTML 로드하기
  const resp = await axios.get(url);
  // ❷ HTML을 파싱하고 DOM 생성하기
  const $ = cheerio.load(resp.data);
  // ❸ CSS 셀렉터로 원하는 요소 찾기
  const elements = $(selector).text();
  // ➍ 찾은 요소를 순회하면서 요소가 가진 텍스트를 출력하기
  //   elements.each((idx, el) => {
  //     // ❺ text() 메서드를 사용하기 위해 Node 객체인 el을 $로 감싸서 cheerio 객체로 변환
  //     console.log($(el).text());
  //   });
  const result = parseInt(removeComma(elements));
  return result;
};

const removeComma = (str: string) => {
  str = str.replace(",", "");
  return str;
};
