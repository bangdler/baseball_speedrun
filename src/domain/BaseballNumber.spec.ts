import BaseballNumber from "./BaseballNumber";

describe("BaseballNumber 테스트", () => {
  it("유효한 input인 경우 세자리 숫자를 가진다.", () => {
    const validInput = "123";

    const sut = new BaseballNumber(validInput);

    expect(sut.numbers.length).toBe(3);
    expect(sut.numbers).toEqual([1, 2, 3]);
  });

  it("네자리 이상의 입력값인 경우 에러가 발생한다.", () => {
    const invalidInput = "1234";

    expect(() => new BaseballNumber(invalidInput)).toThrow(
      "3자리 숫자를 입력해주세요."
    );
  });

  it("숫자가 아닌 입력값인 경우 에러가 발생한다.", () => {
    const invalidInput = "1a4";

    expect(() => new BaseballNumber(invalidInput)).toThrow(
      "숫자를 입력해주세요."
    );
  });

  it("중복된 숫자가 있는 입력값인 경우 에러가 발생한다.", () => {
    const invalidInput = "122";

    expect(() => new BaseballNumber(invalidInput)).toThrow(
      "중복된 숫자는 입력할 수 없습니다."
    );
  });

  it("다른 값과 숫자를 비교하여 같은지를 판단한다.", () => {
    const sut = new BaseballNumber("123");
    const sameBaseballNumber = new BaseballNumber("123");
    const differentBaseballNumber = new BaseballNumber("124");

    expect(sut.isEqual(sameBaseballNumber)).toBeTruthy();
    expect(sut.isEqual(differentBaseballNumber)).toBeFalsy();
  });

  it("다른 값과 숫자를 비교하여 스트라이크, 볼 개수를 판단한다.", () => {
    const sut = new BaseballNumber("123");
    const s1b2 = new BaseballNumber("132");
    const s0b0 = new BaseballNumber("456");
    const s2b0 = new BaseballNumber("125");

    expect(sut.compareTo(s1b2)).toEqual({ strike: 1, ball: 2 });
    expect(sut.compareTo(s0b0)).toEqual({ strike: 0, ball: 0 });
    expect(sut.compareTo(s2b0)).toEqual({ strike: 2, ball: 0 });
  });
});
