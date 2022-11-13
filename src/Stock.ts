export class Stock {
  private _name: string;
  private _setValue: number;

  constructor(name: string, setValue: number) {
    this._name = name;
    this._setValue = setValue;
    this.validatePositive();
  }

  private validatePositive() {
    if (this._setValue < 0) {
      throw new Error(`설정 값은 음수가 될 수 없습니다. setValue = ${this._setValue}`);
    }
  }

  get name(): string {
    return this._name;
  }
  get setValue(): number {
    return this._setValue;
  }
}
