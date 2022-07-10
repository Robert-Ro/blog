import { parse } from "./parse";

describe("parse suits", (): void => {
  it("case 1", () => {
    expect(parse("123")).toBe("123");
  });
});
