export class Iterator {
  current = 0;
  obj: any;
  constructor(obj: any) {
    this.obj = obj;
  }
  next() {
    this.current += 1;
  }
  isDone() {
    return this.current >= this.obj.length;
  }
  getCurrentItem() {
    return this.obj[this.current];
  }
}

export const compare = (iterator1: Iterator, iterator2: Iterator) => {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error("iterator1和iterator2不相等");
    }
    iterator1.next();
    iterator2.next();
  }
  console.log("iterator1与iterator2相等");
};

const iterator1 = new Iterator([1, 2, 3]);
const iterator2 = new Iterator([1, 2, 3]);
compare(iterator1, iterator2);
// const iterator3 = new Iterator([1, 2, 3, 4]);
// const iterator4 = new Iterator([1, 2, 3]);
// compare(iterator3, iterator4);

