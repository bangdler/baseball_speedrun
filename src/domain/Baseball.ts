type BaseballNumber = [number, number, number];

export default class Baseball {
  id: number = new Date().getTime();
  numbers: [number, number, number];
  constructor(input: string) {
    const { result, message } = this.validate(input);
    if (!result) {
      throw Error(message);
    }
    this.numbers = input.split("").map((i) => Number(i)) as BaseballNumber;
  }

  validate(input: string) {
    let result = true;
    let message = "";
    if (input.length > 3) {
      result = false;
      message = "3개 이상의 숫자를 입력해주세요.";
    }
    if (input.split("").some((i) => isNaN(Number(i)))) {
      result = false;
      message = "숫자를 입력해주세요.";
    }

    const set = new Set(input.split(""));
    if (set.size < 3) {
      result = false;
      message = "중복된 숫자가 없어야 합니다.";
    }

    return { result, message };
  }

  isEqual(baseball: Baseball) {
    return baseball.numbers.every((num, i) => this.numbers[i] === num);
  }

  compareTo(baseball: Baseball): { strike: number; ball: number } {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      const cur = this.numbers[i];
      if (cur === baseball.numbers[i]) {
        strike++;
        continue;
      }

      if (baseball.numbers.includes(cur)) {
        ball++;
      }
    }

    return { strike, ball };
  }
}
