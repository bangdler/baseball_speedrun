type TBaseballNumber = [number, number, number];

export const BASEBALL_NUMBER_COUNT = 3;

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
    if (input.length !== BASEBALL_NUMBER_COUNT) {
      return {
        isValid: false,
        message: `${BASEBALL_NUMBER_COUNT}개의 숫자를 입력해주세요.`,
      };
    }
    if (input.split("").some((s) => isNaN(Number(s)))) {
      return { isValid: false, message: "숫자를 입력해주세요." };
    }
    const set = new Set(input.split(""));
    if (set.size < BASEBALL_NUMBER_COUNT) {
      return { isValid: false, message: "중복되지 않은 값을 입력해주세요." };
    }
    return { isValid: true };
  }

  isEqaul(baseballNumber: BaseballNumber) {
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

    return {
      strike,
      ball,
    };
  }
}
