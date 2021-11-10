import { Pub, Sub } from "./pub-sub";

describe("发布订阅模式测试集", () => {
  it("on event", () => {
    const pub = new Pub();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    pub.on("event", fn1);
    pub.on("event2", fn1);
    pub.on("event", fn2);
    expect(pub.subSize()).toEqual(3);
    pub.emit("event");
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2.mock.calls.length).toBe(1);
    pub.emit("event2");
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2.mock.calls.length).toBe(1);
  });
  it("clear case", () => {
    const pub = new Pub();
    const fn = jest.fn();
    pub.on("event", fn);
    pub.emit("event");
    expect(fn).toHaveBeenCalledTimes(1);
    pub.clear();
    expect(pub.subSize()).toEqual(0);
  });
  it("off event", () => {
    const pub = new Pub();
    const fn = jest.fn();
    pub.on("event", fn);
    expect(fn).toHaveBeenCalledTimes(0);
    pub.off("event", fn);
    pub.emit("event");
    expect(fn).toHaveBeenCalledTimes(0);
  });
  it("on * event", () => {
    const pub = new Pub();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    pub.on("event", fn1);
    pub.on("event2", fn1);
    pub.on("event", fn2);
    pub.emit("*");
    pub.emit("event");
    expect(fn1).toHaveBeenCalledTimes(3);
    expect(fn2.mock.calls.length).toBe(2);
  });
});
