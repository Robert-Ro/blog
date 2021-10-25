# 迭代器模式

指提供一种方法顺序访问一个**聚合对象**中的*各个元素*，而又不需要暴露改对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关系对象的内部构造，也可以按顺序访问其中的每个元素。

> FIXME: 使得非数组线性结构的对象可以挨个访问起内部元素?

## jQuery 中的迭代器

迭代器模式无非就是循环访问聚合对象中的各个元素。

## 实现自己的迭代器

```js
// example1
var each = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};
each([1, 2, 3], (item, index) => alert(item));
// example2 ES6迭代器
function* values() {
  let curr = linkedList.head;
  while (curr) {
    yield curr.data;
    curr = curr.next;
  }
}
```

## 内部迭代器和外部迭代器

### 内部迭代器

内部定义好迭代规则，完全接收整个迭代过程，外部只需要一次初始调用。

- 优点：只需要一次初始调用即可
- 缺点：如上述的`each`函数不能同时迭代 2 个数组(场景：判断两个数组是否完全相等)

> 在一些没有闭包的语言中，内部迭代器本身的实现也相当复杂。比如 C 语言中的内部迭代器是用函数指针来实现的。

### 外部迭代器

外部迭代器必须显式地请求迭代下一个元素。外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。

参考例子：[Example](./iterator.ts)

外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。

> 内部迭代器和外部迭代器在实际生产中没有优劣之分，需要根据需求场景而定。

## 迭代类数组对象和字面量对象

迭代器模式不仅可以迭代数组，还可以迭代一些类数组的对象。比如`arguments`、`{"o":'a', "1":'b'}`等。

> 无论是内部迭代器还是外部迭代器，只要被迭代的聚合对象拥有 length 属性而且可以使用下标访问，那它就可以被迭代。

- `for in`语句可以用来迭代普通字面量对象的属性
- `jQuery`中提供的`$.each`函数来封装各种迭代行为

```js
$.each = function (obj, callback) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike(obj);

  if (isArray) {
    // 迭代类数组
    for (; i < length; i++) {
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      // 迭代 object 对象
      value = callback.call(obj[i], i, obj[i]);
      if (value === false) {
        break;
      }
    }
  }
  return obj;
};
```

## 倒序迭代器

总的来说，迭代器模式提供了循环访问一个聚合对象中的每个元素的方法，但它没有规定我们以顺序、倒序还是中序来循环遍历聚合对象。

倒序迭代器:

```js
var reverseEach = function (ary, callback) {
  for (var l = ary.length - 1; l >= 0; l--) {
    callback.call(ary[l], l);
  }
};
reverseEach([0, 1, 2], (item, i) => {
  console.log(item, i);
});
```

## 中止迭代器

迭代器可以像普通 for 循环中的 break 意义，提供一种跳出循环的方法。比如：`break`, `return`等

## 迭代器模式的应用举例

### 不同浏览器上提供上传文件的功能举例

> **开闭原则**

> 现在来梳理一下问题，目前一共有 3 种可能的上传方式，我们不知道目前正在使用的浏览器
> 支持哪几种。就好比我们有一个钥匙串，其中共有 3 把钥匙，我们想打开一扇门但是不知道该使
> 用哪把钥匙，于是从第一把钥匙开始，迭代钥匙串进行尝试，直到找到了正确的钥匙为止。
> 同样，我们把每种获取 `upload` 对象的方法都封装在各自的函数里，然后使用一个迭代器，
> 迭代获取这些 `upload` 对象，直到获取到一个可用的为止：

```js
var getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
  } catch (e) {
    return false;
  }
};

var getFlashUploadObj = function () {
  if (supportFlash()) {
    // supportFlash 函数未提供
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($("body"));
  }
  return false;
};

var getFormUpladObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
  return $(str).appendTo($("body"));
};
```

- 提供一个可以被迭代的方法，使得 ` getActiveUploadObj``，getFlashUploadObj ` 以及 `getFlashUploadObj`依照**优先级**被循环迭代
- 如果正在被迭代的函数返回一个对象，则表示找到了正确的 `upload` 对象，反之如果该函数返回 `false`，则让迭代器继续工作。

重构如下：

```js
var iteratorUploadObj = function () {
  for (var i = 0; i < arguments.length; i++) {
    var uploadObj = arguments[i]();
    if (uploadObj !== false) {
      return uploadObj;
    }
  }
};
iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);
```

重构代码之后，我们可以看到，获取不同上传对象的方法被隔离在各自的函数里互不干扰，`try`、`catch` 和 `if` 分支不再纠缠在一起，使得我们可以很方便地的维护和扩展代码。比如，后来我们又给上传项目增加了 `Webkit` 控件上传和 `HTML5` 上传，我们要做的仅仅是下面一些工作。

- 增加分别获取 Webkit 控件上传对象和 HTML5 上传对象的函数：

```js
var getWebkitUploadObj = function () {
  // 具体代码略
};

var getHtml5UploadObj = function () {
  // 具体代码略
};
```

- 依照优先级把它们添加进迭代器：

```js
var uploadObj = iteratorUploadObj(
  getActiveUploadObj,
  getWebkitUploadObj,
  getFlashUploadObj,
  getHtml5UploadObj,
  getFormUpladObj
);
```

## 小结

迭代器模式是一种相对简单的模式。目前大多数语言内部都内置了迭代器。
