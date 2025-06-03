import BaseballNumber from "./BaseballNumber";

describe("BaseballNumber 테스트", () => {
  it("유효한 값으로 생성 시 3개의 숫자를 가진다.", () => {
    const validInput = "123";

    const sut = new BaseballNumber(validInput);

    expect(sut.numbers.length).toBe(3);
    expect(sut.numbers).toEqual([1, 2, 3]);
  });

  it("3자리보다 크거나 작은 경우, 에러를 반환한다.", () => {
    const longInput = "1234";
    const shortInput = "12";

    expect(() => new BaseballNumber(longInput)).toThrow(
      "3개의 숫자를 입력해주세요."
    );
    expect(() => new BaseballNumber(shortInput)).toThrow(
      "3개의 숫자를 입력해주세요."
    );
  });

  it("숫자가 아닌 경우, 에러를 반환한다.", () => {
    const nanInput = "1a2";

    expect(() => new BaseballNumber(nanInput)).toThrow("숫자를 입력해주세요.");
  });

  it("중복값인 경우, 에러를 반환한다.", () => {
    const dupulicatedInput = "112";

    expect(() => new BaseballNumber(dupulicatedInput)).toThrow(
      "중복되지 않은 값을 입력해주세요."
    );
  });

  it("다른 BaseballNumber와 같은지 비교한다.", () => {
    const sameOne = new BaseballNumber("123");
    const diffOne = new BaseballNumber("234");

    const sut = new BaseballNumber("123");

    expect(sut.isEqaul(sameOne)).toBeTruthy();
    expect(sut.isEqaul(diffOne)).toBeFalsy();
  });

  it("다른 BaseballNumber와 비교하여 strike, ball 개수를 반환한다.", () => {
    const tests = [
      { input: "123", result: { strike: 3, ball: 0 } },
      { input: "345", result: { strike: 0, ball: 1 } },
      { input: "456", result: { strike: 0, ball: 0 } },
    ];

    const sut = new BaseballNumber("123");

    tests.forEach((test) => {
      expect(sut.compareTo(new BaseballNumber(test.input))).toEqual(
        test.result
      );
    });
  });
});

