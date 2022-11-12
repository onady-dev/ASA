import { expect } from "chai";
import { Stock } from "../src/Stock";

describe("Stock", () => {
  it("2번째(setValue) 인수에 음수가 들어가면 에러가 발생한다.", () => {
    const name = "삼성전자";
    const setValue = -1;
    const highOrLow = "high";
    expect(() => {
      new Stock(name, setValue, highOrLow);
    }).to.throw();
  });

  it("3번째(highOrLow) 인수에 'high' 또는 'low'가 아닌 문자열이 들어가면 에러가 발생한다.", () => {
    const name = "삼성전자";
    const setValue = 100;
    const highOrLow = "test";
    expect(() => {
      new Stock(name, setValue, highOrLow);
    }).to.throw();
  });

  it("name 가져오기", () => {
    const name = "삼성전자";
    const setValue = 100000;
    const highOrLow = "high";
    const stock = new Stock(name, setValue, highOrLow);
    expect(stock.name).to.equal("삼성전자");
  });

  it("setValue 가져오기", () => {
    const name = "삼성전자";
    const setValue = 100000;
    const highOrLow = "high";
    const stock = new Stock(name, setValue, highOrLow);
    expect(stock.setValue).to.equal(100000);
  });

  it("highOrLow 가져오기", () => {
    const name = "삼성전자";
    const setValue = 100000;
    const highOrLow = "high";
    const stock = new Stock(name, setValue, highOrLow);
    expect(stock.highOrLow).to.equal("high");
  });
});
