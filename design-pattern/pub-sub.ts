/**
 * 事件key名，支持通配符和特定字符
 * *: 所有的事件
 */
type EventKey = "*" | string;
/**
 * 订阅者函数类型
 * FIXME
 */
type Sub = (...args: unknown[]) => unknown;
/**
 * 支持先发布后订阅
 */
interface IPub<T extends Sub> {
  emit(key: EventKey, data: unknown): unknown;
  on(key: EventKey, fn: T, last?: boolean): void;
  one(key: EventKey, fn: T, last?: boolean): void;
  clear(): void;
  off(key: EventKey, fn: T): void;
}

export class Pub<T extends Sub> implements IPub<T> {
  private subsribers: Map<string, T[]> = new Map();
  private offlineStack: ((key: EventKey, fn: T) => unknown)[] | null = [];

  /**
   * 发布事件
   * 支持先发布后订阅，发布的事件只触发一次：事件触发时还未有观察者，因此先把触发的事件存储起来
   * @param key
   * @returns
   */
  emit(key: EventKey, data: unknown): unknown {
    // when emit a event, all subs will be notified
    let fns: T[] = [];
    // 获取全部的观察者
    if (key === "*") {
      fns = [];
      this.subsribers.forEach((_fns) => {
        fns.push(..._fns);
      });
    } else {
      fns = this.subsribers.get(key) || [];
    }

    if (fns.length === 0) {
      // 无观察者，存储离线消息
      if (this.offlineStack) {
        const _fn = function (_key: EventKey, fn: T) {
          if (_key === key) {
            return fn(data);
          }
        };
        this.offlineStack!.push(_fn);
      }
    } else {
      // 有观察者，通知观察者执行
      fns.forEach((fn) => fn.call(null, data));
    }
    return;
  }
  /**
   * 添加监听者
   * 触发离线消息，离线模式：只取最新一个或者全部
   * @param key
   * @param fn
   */
  on(key: EventKey, fn: T, last?: boolean): void {
    if (!this.subsribers.get(key)) {
      this.subsribers.set(key, []);
    }
    this.subsribers.get(key)!.push(fn);
    if (last && this.offlineStack) {
      const lastItem = this.offlineStack.pop();
      lastItem && lastItem(key, fn);
    } else {
      // 离线消息根据key触发
      this.offlineStack?.forEach((_fn) => _fn(key, fn));
    }
    this.offlineStack = null;
  }

  off(key: EventKey, fn: T): void {
    const fns = this.subsribers.get(key);
    if (!fns) {
      return;
    }
    const index = fns.indexOf(fn);
    if (index === -1) {
      return;
    }
    (this.subsribers.get(key) || []).splice(index, 1);
  }
  one(key: string, fn: T, last?: boolean): void {
    // TODO
  }
  clear(): void {
    this.subsribers.clear();
  }
}
