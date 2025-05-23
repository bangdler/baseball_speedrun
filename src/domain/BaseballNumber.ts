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
      return { isValid: false, message: "3개의 숫자를 입력해주세요." };
    }

    if (input.split("").some((n) => isNaN(Number(n)))) {
      return { isValid: false, message: "숫자만 입력해주세요." };
    }

    const set = new Set(input.split(""));
    if (set.size < 3) {
      return { isValid: false, message: "중복된 숫자 없이 입력해주세요." };
    }

    return { isValid: true };
  }

  isEqual(baseballNumber: BaseballNumber) {
    return this.numbers.every((n, i) => baseballNumber.numbers[i] === n);
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
