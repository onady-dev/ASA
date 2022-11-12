export class Stock {
  private _name: string;
  private _setValue: number;
  private _highOrLow: string;

  constructor(name: string, setValue: number, highOrLow: string) {
    this._name = name;
    this._setValue = setValue;
    this._highOrLow = highOrLow;
    this.validatePositive();
    this.validateHighLow();
  }

  private validatePositive() {
    if (this._setValue < 0) {
      throw new Error(`설정 값은 음수가 될 수 없습니다. setValue = ${this._setValue}`);
    }
  }

  private validateHighLow() {
    if (this._highOrLow !== "high" && this._highOrLow !== "low") {
      throw new Error(`high 또는 low만 선택할 수 있습니다. highOrLow = ${this._highOrLow}`);
    }
  }

  get name(): string {
    return this._name;
  }
  get setValue(): number {
    return this._setValue;
  }
  get highOrLow(): string {
    return this._highOrLow;
  }
}
