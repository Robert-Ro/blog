// 使用基类,类抽象改造
class Meta {
  late double price;
  late String name;
  Meta(this.name, this.price);
}

//定义商品Item类
class Item extends Meta {
  Item(name, price) : super(name, price);
}

//定义购物车类
class ShoppingCart extends Meta {
  late DateTime date;
  late String code;
  late List<Item> bookings;

  double get price {
    double sum = 0.0;
    for (var i in bookings) {
      sum += i.price;
    }
    return sum;
  }

  // 简化赋值，且设置默认值
  ShoppingCart(name, this.code)
      : date = DateTime.now(),
        super(name, 0);
  getInfo() {
    return '购物车信息:' +
        '\n-----------------------------' +
        '\n用户名: ' +
        name +
        '\n优惠码: ' +
        code +
        '\n总价: ' +
        price.toString() +
        '\n日期: ' +
        date.toString() +
        '\n-----------------------------';
  }
}

void main() {
  ShoppingCart sc = ShoppingCart('张三', '123456');
  sc.bookings = [Item('苹果', 10.0), Item('鸭梨', 20.0)];
  print(sc.getInfo());
}
