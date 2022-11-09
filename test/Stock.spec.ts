import { expect } from "chai";
import exp from "constants";
import { Stock } from "../src/Stock";

describe("Stock", () => {
  it("setValue 인수에 음수가 들어가면 에러가 발생한다.", () => {
    const name = "삼성전자";
    const setValue = -1;
    const highOrLow = "high";
    expect(new Stock(name, setValue, highOrLow)).to.throw(new Error("설정 값은 음수가 될 수 없습니다. setValue = -1"));
  });
});
