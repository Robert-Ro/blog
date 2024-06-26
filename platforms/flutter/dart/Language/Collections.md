# Collections

## lists

```dart
var list = [1, 2, 3];
```

## Sets

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

> Set or map?
> The syntax for map literals is similar to that for set literals. Because map literals came first, {} defaults to the Map type. If you forget the type annotation on {} or the variable it's assigned to, then Dart creates an object of type `Map<dynamic, dynamic>`.

## Maps

> In Dart, the new keyword is optional. For details, see [Using constructors](https://dart.dev/language/classes#using-constructors).

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

## Operators

### Spread operators

Dart supports the **spread operator** (...) and the **null-aware spread operator** (...?) in list, map, and set literals. Spread operators provide a concise way to insert multiple values into a collection.

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
// might be null
var list2 = [0, ...?list];
assert(list2.length == 1);
```

### Control-flow operators

```dart
// collection if
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];
var nav = ['Home', 'Furniture', 'Plants', if (login case 'Manager') 'Inventory'];
// collection for
var listOfInts = [1, 2, 3];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
assert(listOfStrings[1] == '#1');

```
