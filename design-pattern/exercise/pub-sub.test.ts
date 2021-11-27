import { Pub } from "./pub-sub";

const subSize = <T>(subsribers: Map<string, T[]>) => {
  const keys = Object.keys(subsribers);
  return keys.reduce((prev, key) => {
    prev += (subsribers.get(key) || []).length;
    return prev;
  }, 0);
};

describe("发布订阅模式测试集", () => {
  it("发布的事件能被订阅者正常接收", () => {
    const pub = new Pub();
    const fn = jest.fn((data: unknown) => (data as number) + 1);
    pub.on("event", fn);
    pub.emit("event", 2);
    expect(fn).toReturnWith(3);
    expect(fn).toHaveBeenCalledTimes(1); // fn.mock.calls.length
  });
  describe("先发布后订阅", () => {
    it("case 1", () => {
      const pub = new Pub();
      const fn = jest.fn((data: unknown) => {
        return (data as number) + 1;
      });
      pub.emit("foo", 2);
      pub.on("foo", fn);
      expect(fn).toReturnWith(3);
      expect(fn).toHaveBeenCalledTimes(1);
    });
    it("case 2", () => {
      const pub = new Pub();
      const fn = jest.fn((data: unknown) => (data as number) + 1);
      pub.emit("foo", 2);
      pub.on("bar", fn);
      expect(fn).not.toReturn();
      expect(fn).toHaveBeenCalledTimes(0);
    });
    it("case 3", () => {
      const pub = new Pub();
      const fn = jest.fn((data: unknown) => {
        return (data as number) + 1;
      });
      pub.emit("foo", 2);
      pub.emit("foo", 3);
      pub.on("foo", fn, true);
      expect(fn).toReturnWith(4);
      expect(fn).toHaveBeenCalledTimes(1);
    });
    it("case 4", () => {
      const pub = new Pub();
      const fn = jest.fn((data: unknown) => {
        return (data as number) + 1;
      });
      pub.emit("foo", 2);
      pub.emit("foo", 3);
      pub.emit("foo", 4);
      pub.emit("foo", 5);
      pub.on("foo", fn);
      expect(fn).toHaveBeenCalledTimes(4);
    });
  });

  it("清除所有的事件", () => {
    const pub = new Pub();
    const fn = jest.fn((data: unknown) => (data as number) + 1);
    pub.on("event", fn);
    pub.clear();
    pub.emit("event", 2);
    pub.emit("event", 3);
    expect(fn).toHaveBeenCalledTimes(0);
  });
  it("销毁特定事件", () => {
    const pub = new Pub();
    const fn1 = jest.fn((data: unknown) => (data as number) + 1);
    const fn2 = jest.fn((data: unknown) => (data as number) + 3);
    const fn3 = jest.fn((data: unknown) => (data as number) + 3);
    pub.on("foo", fn1);
    pub.on("bar", fn1);

    pub.on("foo", fn2);

    pub.off("foo", fn1);

    pub.off("foo2", fn1);
    pub.off("foo", fn3);

    pub.emit("foo", 2);
    pub.emit("bar", 3);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toReturnWith(4);

    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toReturnWith(5);
  });
  it("触发通用事件", () => {
    const pub = new Pub();
    const fn1 = jest.fn((data: unknown) => (data as number) + 1);
    pub.on("foo", fn1);
    pub.on("bar", fn1);
    const fn2 = jest.fn((data: unknown) => (data as number) + 2);
    pub.on("bar", fn2);

    pub.emit("*", 20);

    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toReturnWith(22);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});
