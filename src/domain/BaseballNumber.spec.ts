import BaseballNumber from "./BaseballNumber";

describe("BaseballNumber 테스트", () => {
  it("유효한 입력값인 경우, 3개의 숫자를 가진다.", () => {
    const validInput = "123";

    const sut = new BaseballNumber(validInput);

    expect(sut.numbers.length).toBe(3);
    expect(sut.numbers).toEqual([1, 2, 3]);
  });

  it("3개의 숫자가 아닌 입력값인 경우 에러를 반환한다.", () => {
    const longInput = "1234";
    const shortInput = "12";

    expect(() => new BaseballNumber(longInput)).toThrow(
      "3개의 숫자를 입력해주세요."
    );
    expect(() => new BaseballNumber(shortInput)).toThrow(
      "3개의 숫자를 입력해주세요."
    );
  });

  it("숫자가 아닌 입력값인 경우 에러를 반환한다.", () => {
    const notNumberInput = "a1c";

    expect(() => new BaseballNumber(notNumberInput)).toThrow(
      "숫자만 입력해주세요."
    );
  });

  it("중복된 숫자가 있는 입력인 경우 에러를 반환한다.", () => {
    const duplicatedInput = "112";

    expect(() => new BaseballNumber(duplicatedInput)).toThrow(
      "중복된 숫자 없이 입력해주세요"
    );
  });

  it("다른 BaseballNumber와 같은지 확인한다.", () => {
    const sut = new BaseballNumber("123");
    const sameOne = new BaseballNumber("123");
    const diffOne = new BaseballNumber("124");

    expect(sut.isEqual(sameOne)).toBeTruthy();
    expect(sut.isEqual(diffOne)).toBeFalsy();
  });

  it("다른 BaseballNumber와 strike, ball 개수를 비교한다.", () => {
    const testCases = [
      { test: new BaseballNumber("123"), answer: { strike: 3, ball: 0 } },
      { test: new BaseballNumber("132"), answer: { strike: 1, ball: 2 } },
      { test: new BaseballNumber("456"), answer: { strike: 0, ball: 0 } },
      { test: new BaseballNumber("152"), answer: { strike: 1, ball: 1 } },
    ];

    const sut = new BaseballNumber("123");

    testCases.forEach(({ test, answer }) => {
      expect(sut.compareTo(test)).toEqual(answer);
    });
  });
});
