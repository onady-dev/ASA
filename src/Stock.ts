export class Stock {
  private name: string;
  private setValue: number;
  private highOrLow: string;

  constructor(name: string, setValue: number, highOrLow: string) {
    this.name = name;
    this.setValue = setValue;
    this.highOrLow = highOrLow;
    this.validatePositive();
  }

  private validatePositive() {
    if (this.setValue < 0) {
      throw new Error(`설정 값은 음수가 될 수 없습니다. setValue = ${this.setValue}`);
    }
  }

  private validateHighLow() {
    if (this.highOrLow === "high" || this.highOrLow === "low") {
      throw new Error(`high 또는 low만 선택할 수 있습니다. highOrLow = ${this.highOrLow}`);
    }
  }
}
