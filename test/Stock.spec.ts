import { expect } from "chai";
import { Stock } from "../src/Stock";

describe("Stock", () => {
  it("2번째(setValue) 인수에 음수가 들어가면 에러가 발생한다.", () => {
    const name = "삼성전자";
    const setValue = -1;
    expect(() => {
      new Stock(name, setValue);
    }).to.throw();
  });

  it("name 가져오기", () => {
    const name = "삼성전자";
    const setValue = 100000;
    const stock = new Stock(name, setValue);
    expect(stock.name).to.equal("삼성전자");
  });

  it("setValue 가져오기", () => {
    const name = "삼성전자";
    const setValue = 100000;
    const stock = new Stock(name, setValue);
    expect(stock.setValue).to.equal(100000);
  });
});
