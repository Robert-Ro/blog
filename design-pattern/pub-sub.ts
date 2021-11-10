interface ISub {
  fn: () => void;
  update(): void;
}
export class Sub implements ISub {
  constructor(fn: () => void) {
    this.fn = fn;
  }
  fn: () => void;
  update(): void {
    this.fn();
  }
}
type SubFn = () => any;
type IKey = "*" | string;
/**
 * 支持先发布后订阅
 */
interface IPub<T extends SubFn> {
  emit(key: IKey): void;
  on(key: IKey, fn: T): void;
  create(ns: string): this;
  clear(): void;
  off(key: IKey, fn: T): void;
  subSize(): number;
}

export class Pub<T extends SubFn> implements IPub<T> {
  private namespaces: string[] = [];
  private namespace?: string;
  private subsribers: { [key: IKey]: T[] } = {};
  private unResolveEvents: string[] = [];
  /**
   * 发布事件
   * 支持先发布后订阅，发布的事件只触发一次
   * @param key
   * @returns
   */
  emit(key: IKey): void {
    let fns = this.subsribers[key];
    if (key === "*") {
      const keys = Object.keys(this.subsribers);
      fns = keys.reduce((prev: T[], key) => {
        prev = prev.concat(this.subsribers[key]);
        return prev;
      }, []);
    }
    if (!fns || fns.length === 0) return;
    fns.forEach((fn) => fn());
  }
  on(key: IKey, fn: T): void {
    if (!this.subsribers[key]) {
      this.subsribers[key] = [];
    }
    this.subsribers[key].push(fn);
  }
  create(ns: string): this {
    this.namespaces.push(ns);
    this.namespace = ns;
    return this;
  }
  off(key: IKey, fn: T): void {
    const fns = this.subsribers[key];
    if (!fns) {
      return;
    }
    const index = fns.indexOf(fn);
    if (index === -1) {
      return;
    }
    this.subsribers[key].splice(index, 1);
  }
  clear(): void {
    this.subsribers = {};
  }
  subSize() {
    const keys = Object.keys(this.subsribers);
    return keys.reduce((prev, key) => {
      prev += this.subsribers[key].length;
      return prev;
    }, 0);
  }
}
