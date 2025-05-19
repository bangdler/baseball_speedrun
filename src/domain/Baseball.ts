type BaseballNumber = [number, number, number];

export class Baseball {
  baseballNumber: BaseballNumber;

  constructor(input: string) {
    this.validate(input);
    this.baseballNumber = this.makeBaseballNumber(input);
  }

  validate(input: string) {
    console.log(input);
    if (input.length !== 3) {
      throw new Error("3개의 숫자를 입력해주세요.");
    }
    if (input.split("").some((number) => isNaN(Number(number)))) {
      throw new Error("숫자를 입력해주세요.");
    }
    const set = new Set(input.split(""));
    if (set.size !== 3) {
      throw new Error("중복된 숫자는 입력하지 못해요.");
    }
  }

  makeBaseballNumber(input: string): BaseballNumber {
    return input.split("").map(Number) as BaseballNumber;
  }

  isEqual(baseball: Baseball) {
    return this.baseballNumber.every(
      (num, index) => num === baseball.baseballNumber[index]
    );
  }

  compareTo(baseball: Baseball) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < this.baseballNumber.length; i++) {
      if (this.baseballNumber[i] === baseball.baseballNumber[i]) {
        strike++;
        continue;
      }

      if (baseball.baseballNumber.includes(this.baseballNumber[i])) {
        ball++;
      }
    }
    return { strike: strike, ball: ball };
  }
}
