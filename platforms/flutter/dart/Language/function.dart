import 'dart:io';

bool isNobile(int atomicNumber) {
  return atomicNumber > 100;
}

bool isNobile2(int atomicNumber) => atomicNumber > 100;
void enableFlags({bool? bold, bool? hidden}) {
  print(bold);
  print(hidden);
}

String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

bool topLevel = true;
void main(List<String> args) {
  print(args);

  var file = File('function.dart');
  file.readAsLines().then((contents) {
    print(contents.length);
  });
  var list = [1, 2, 3, 4];
  var it = (i) => print(i);
  list.forEach(it);

  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;
      var insideFunction = false;

      print(topLevel);
      print(insideMain);
      print(insideFunction); // 同名替换
      print(insideNestedFunction);
    }

    nestedFunction();
  }

  myFunction();

  var charCodes = [68, 97, 114, 116];
  var buffer = StringBuffer();
  charCodes.forEach(print);
  charCodes.forEach(buffer.write);

  Iterable<int> naturalsTo(int n) sync* {
    int k = 0;
    while (k < n) yield k++;
  }

  var it2 = naturalsTo(10);
  it2.forEach(print);
}
