interface ExampleImageElement {}
interface ExampleTextElement {
  left: number;
  top: number;
}
type ExampleElement = ExampleImageElement | ExampleTextElement;
type T = keyof Element;
type ExamplePartial<T> = {
  [P in keyof T]?: T[P] | undefined;
};
class ExampleHistory {
  commit<
    T extends ExampleElement,
    // 第二个参数的结构来自 T，而第三个参数的结构又来自第二个参数
    U extends ExamplePartial<{ [K in keyof T]: T[K] }>,
    V extends { [K in keyof U]: U[K] }
  >(element: T, from: U, to: V) {}
}

const exampleHistory = new ExampleHistory();
const element: ExampleTextElement = {
  left: 0,
  top: 0,
};
// 这样我们仍然可以这样调用
// 现在 `from` 和 `to` 的字段就必须完全一致了
exampleHistory.commit(element, { left: 0 }, { left: 10 });

// 这样的字段 bug 就可以在编译期被发现
// @ts-expect-error
exampleHistory.commit(element, { xxx: 0 }, { yyy: 1 });

// 虽然 `from` 和 `to` 都有效，但它们二者的字段却对不上
// @ts-expect-error
exampleHistory.commit(element, { left: 0 }, { top: 10 });
