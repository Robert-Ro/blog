// 使用基类,类抽象改造
class Meta {
  late double price;
  late String name;
  Meta(this.name, this.price);
}

mixin PrintHelper {
  printInfo() => print(getInfo());
  getInfo();
}

//定义商品Item类
class Item extends Meta {
  Item(name, price) : super(name, price);
  //重载了+运算符，合并商品为套餐商品
  Item operator +(Item item) => Item(name + item.name, price + item.price);
}

//定义购物车类
class ShoppingCart extends Meta with PrintHelper {
  late DateTime date;
  late String? code;
  late List<Item> bookings;

  double get price =>
      bookings.reduce((value, element) => value + element).price;

  // 简化赋值，且设置默认值
  ShoppingCart(name, [this.code])
      : date = DateTime.now(),
        super(name, 0);

  @override
  getInfo() {
    return """
购物车信息:
-----------------------------
用户名: $name
优惠码: ${code ?? '没有'}
总价: ${price.toString()}
日期: ${date.toString()}
-----------------------------
""";
  }
}

void main() {
  ShoppingCart('张三', '123456')
    ..bookings = [Item('苹果', 10.0), Item('鸭梨', 20.0)]
    ..printInfo();

  ShoppingCart('李四')
    ..bookings = [Item('香蕉', 15.0), Item('西瓜', 40.0)]
    ..printInfo();
}
