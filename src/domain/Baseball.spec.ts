import Baseball from "./Baseball";

describe("Baseball Test", () => {
  it("Baseball 생성 시 3개 숫자를 가진다.", () => {
    const sut = new Baseball("123");

    expect(sut.numbers.length).toBe(3);
    expect(sut.numbers).toEqual([1, 2, 3]);
  });

  it("Baseball 생성 시 입력값이 3보다 크면 에러가 발생한다.", () => {
    expect(() => new Baseball("1234")).toThrow(
      "3개 이상의 숫자를 입력해주세요."
    );
  });

  it("Baseball 생성 시 숫자가 아닌 문자열을 입력하면 에러가 발생한다.", () => {
    expect(() => new Baseball("abc")).toThrow("숫자를 입력해주세요.");
  });

  it("Baseball 생성 시 숫자가 중복된 숫자를 입력하면 에러가 발생한다.", () => {
    expect(() => new Baseball("112")).toThrow("중복된 숫자가 없어야 합니다.");
  });

  it("다른 Baseball과 모든 숫자가 같은지 확인한다.", () => {
    const sut = new Baseball("123");
    const test1 = new Baseball("123");
    const test2 = new Baseball("124");

    expect(sut.isEqual(test1)).toBe(true);
    expect(sut.isEqual(test2)).toBe(false);
  });

  it("다른 Baseball과 비교하여 strike, ball 개수를 확인한다.", () => {
    const sut = new Baseball("123");
    const test1 = new Baseball("123");
    const test2 = new Baseball("124");
    const test3 = new Baseball("241");

    expect(sut.compareTo(test1)).toEqual({ strike: 3, ball: 0 });
    expect(sut.compareTo(test2)).toEqual({ strike: 2, ball: 0 });
    expect(sut.compareTo(test3)).toEqual({ strike: 0, ball: 2 });
  });
});
