type TBaseballNumber = [number, number, number];

export default class BaseballNumber {
  numbers: TBaseballNumber;

  constructor(input: string) {
    const result = this.validate(input);
    if (!result.isValid) {
      throw new Error(result.message);
    }
    this.numbers = input.split("").map(Number) as TBaseballNumber;
  }

  validate(input: string): { isValid: boolean; message?: string } {
    if (input.length !== 3) {
      return { isValid: false, message: "3자리 숫자를 입력해주세요." };
    }
    if (input.split("").some((n) => isNaN(Number(n)))) {
      return { isValid: false, message: "숫자를 입력해주세요." };
    }
    const set = new Set(input.split(""));
    if (set.size < 3) {
      return { isValid: false, message: "중복된 숫자는 입력할 수 없습니다." };
    }
    return { isValid: true };
  }

  isEqual(baseballNumber: BaseballNumber) {
    return this.numbers.every((n, i) => n === baseballNumber.numbers[i]);
  }

  compareTo(baseballNumber: BaseballNumber): { strike: number; ball: number } {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      const cur = this.numbers[i];
      if (cur === baseballNumber.numbers[i]) {
        strike++;
        continue;
      }
      if (baseballNumber.numbers.includes(cur)) {
        ball++;
      }
    }
    return { strike, ball };
  }
}
