# Record heap snapshots

Learn how to record heap snapshots with the Chrome DevTools heap profiler and find memory leaks.
学习使用 Chrome DevTools heap profiler 记录内存堆快照来找出内存泄漏

The Chrome DevTools heap profiler shows memory distribution by your page's JavaScript objects and related DOM nodes (see also [Objects retaining tree](https://developer.chrome.com/docs/devtools/memory-problems/memory-101#objects_retaining_tree)). Use it to take JS heap snapshots, analyze memory graphs, compare snapshots, and find memory leaks.
Chrome DevTools 堆分析器显示页面的 JavaScript 对象及相关 DOM 节点的内存分布情况（也可参见对象保持树）。使用它来捕获 JS 堆快照、分析内存图、比较快照，并找出内存泄漏

## Take a snapshots

`memory panel` -> `take snapshots`

**Snapshots** are initially stored in the renderer process memory. They are transferred to the DevTools on demand, when you click on the snapshot icon to view it.
快照最初存储在渲染器进程的内存中。当您点击快照图标查看时，它们会根据需要传输到 DevTools 中。

After the snapshot has been loaded into DevTools and has been parsed, the number below the snapshot title appears and shows the total size of the [reachable JavaScript objects](https://developer.chrome.com/docs/devtools/memory-problems/memory-101#object-sizes):
在快照被加载到 DevTools 并被解析后，快照标题下方的数字会出现，显示可达 JavaScript 对象的总大小：
![](https://developer.chrome.com/static/docs/devtools/memory-problems/heap-snapshots/image/total-size-reachable-obj-798fa03db1861_856.png)

> Only reachable objects are included in snapshots. Also, taking a snapshot always starts with a garbage collection.快照中仅包括可达对象。此外，每次捕获快照都会以垃圾回收的方式开始。

### "可达对象"（reachable objects）

"可达对象"（reachable objects）指的是在 JavaScript **堆**中可以通过引用链直接或间接访问到的对象。垃圾收集器会识别那些不再被程序引用的对象，并将其标记为"不可达"，以便在后续的垃圾回收过程中清理掉这些不再使用的对象。

在快照中，只包含可达对象的信息。这意味着被垃圾收集器标记为不可达的对象，不会被包含在快照中。这是为了提供有关程序实际内存使用情况的准确信息，而不受已被标记为垃圾的对象的影响。

## Clear snapshots

Remove snapshots (both from DevTools and renderers memory) by pressing the Clear all profiles icon:

Closing the DevTools window will not delete profiles from the renderers memory. When reopening DevTools, all previously taken snapshots will reappear in the list of snapshots.
关闭 DevTools 窗口不会从渲染器内存中删除配置文件。重新打开 DevTools 时，所有先前捕获的快照都将重新出现在快照列表中。

**Example**: Try out this example of [scattered objects](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html) and profile it using the Heap Profiler. You should see a number of (object) item allocations.

### example3

- scattered objects: "Scattered objects" 中文可以翻译为 "分散的对象"。在这个上下文中，"scattered" 强调了生成的对象在内存中是分散存储的，而不是在连续的内存块中。
- 经过前后比较，可以发现新增的对象
- 通过查看构造函数，可以快速发现页面中的对象及其属性
- `@12345678` 的标识，其中的数字是一个十六进制的值，代表对象在内存中的地址
- 输入框可根据构造器名称进行筛洗
- 多次 take snapshot 会触发 gc

> 在 Chrome DevTools 的 Memory 面板中，你可能会看到快照中的 Document 下有两个 document 对象。这是因为> 在浏览器中，通常会存在两个不同的 document 对象：
> **主文档对象**（Main Document Object）：这个 document 对象代表整个页面的文档对象模型（DOM），包括 HTML、CSS 和 JavaScript 等内容。
> **引用文档对象**（Referenced Document Object）：这个 document 对象代表了一些特定的情况，比如在 iframe 或者 frame 中加载的文档，或者通过 JavaScript 动态创建的新文档。
> 因此，当你在 Memory 面板中看到 Document 下有两个 document 对象时，很可能是因为页面中存在 iframe、frame 或者动态创建的文档，导致了这种情况。这些额外的 document 对象代表了页面中不同的文档实体，每个都有自己的 DOM 结构和相关信息。
> 正式版 chrome 下更多，这可能与浏览器插件、扩展或者页面中嵌套的 iframe 等因素有关

## View snapshots

View snapshots from different perspectives for different tasks.

**Summary view 概要视图** shows objects grouped by the constructor name. Use it to hunt down objects (and their memory use) based on type grouped by constructor name. It's particularly helpful for [tracking down DOM leaks](https://developer.chrome.com/docs/devtools/memory-problems#overview).根据构造函数名称进行分组。基于构造函数名称可查找对象及其内存使用。对于发现 DOM 内存泄漏特别有用

**Comparison view 比较视图** displays difference between two snapshots. Use it to compare two (or more) memory snapshots of before and after an operation. Inspecting the delta in freed memory and reference count lets you confirm the presence and cause of a memory leak.显示两个快照之间的差异。查看`freed memory`和`reference count`的差别，可让你确认是否存在内存泄漏以及内存泄漏的原因。

**Containment view** allows exploration of heap contents. It provides a better view of object structure, helping analyze objects referenced in the global namespace (window) to find out what is keeping them around. Use it to analyze closures and dive into your objects at a low level.**Containment view**允许探索堆内容。它提供了更好的对象结构视图，帮助分析全局命名空间（window）中引用的对象，以找出是什么使它们保持在内存中。使用它来分析闭包并深入低级别地研究对象。

**Dominators view** shows the dominators tree and can be useful to find accumulation points. This view helps confirm that no unexpected references to objects are still hanging around and that deletion/garbage collection is actually working.
Dominators view 显示支配树，可以帮助找到积聚点。这个视图有助于确认对象没有意外的引用仍然存在，并且删除/垃圾回收实际上正在起作用。(新版 chrome 已无此视图)

> Not all properties are stored on the JavaScript heap. Properties implemented using getters that execute native code aren't captured. Also, non-string values such as numbers are not captured. 不是所有的属性都会存储到 js 堆内存上。

### Summary view

Top-level entries are "total" lines. They display:

- **Constructor** represents all objects created using this constructor 构造函数代表使用该构造函数创建的所有对象.
- **Number of object instances** is displayed in the # column.
- **Shallow size** column displays the sum of shallow sizes of all objects created by a certain constructor function. The shallow size is the size of memory held by an object itself (generally, arrays and strings have larger shallow sizes). See also [Object sizes](https://developer.chrome.com/docs/devtools/memory-problems/memory-101#object-sizes).“浅层大小”列显示了由特定构造函数创建的所有对象的浅层大小之和。浅层大小是对象本身所占用的内存大小（通常，数组和字符串的浅层大小较大）。另请参阅对象大小
- **Retained size** column displays the maximum retained size among the same set of objects. The size of memory that can be freed once an object is deleted (and this its dependents made no longer reachable) is called the retained size. See also Object sizes.“保留大小”列显示了同一组对象中的最大保留大小。一旦对象被删除（因此其依赖项不再可达），可以释放的内存大小称为保留大小。另请参阅对象大小。
- **Distance** displays the distance to the root using the shortest simple path of nodes.“距离”显示了使用节点的最短简单路径到达根节点的距离。

After expanding a total line in the upper view, all of its instances are displayed. For each instance, its shallow and retained sizes are displayed in the corresponding columns. The number after the @ character is the objects' unique ID, allowing you to compare heap snapshots on per-object basis.
在扩展上方视图中的总计行后，会显示其所有实例。对于每个实例，其浅层大小和保留大小显示在相应的列中。@字符后面的数字是对象的唯一 ID，使您能够基于每个对象进行堆快照比较。

Remember that yellow objects have JavaScript references on them and red objects are detached nodes which are referenced from one with a yellow background.
请记住，黄色对象具有 JavaScript 引用，而红色对象是已分离的节点，它们被具有黄色背景的节点引用。

#### What do the various constructor (group) entries in the Heap profiler correspond to?

- **(global property)**–intermediate objects between a global object (like 'window') and an object referenced by it. If an object is created using a constructor Person and is held by a global object, the retaining path would look like [global] > (global property) > Person. This contrasts with the norm, where objects directly reference each other. We have intermediate objects for performance reasons. Globals are modified regularly and property access optimizations do a good job for non-global objects aren't applicable for globals.**全局对象**（如 'window'）和被其引用的对象之间的中间对象。如果使用构造函数 Person 创建了一个对象，并且该对象由全局对象持有，保留路径将显示为 [global] > (global property) > Person。这与通常情况下对象直接相互引用的情况形成对比。出于性能考虑，我们使用中间对象。全局对象经常被修改，而属性访问优化对非全局对象并不适用于全局对象。

- **(roots)**–The root entries in the retaining tree view are the entities that have references to the selected object. These can also be references created by the engine for its own purposes. The engine has caches which reference objects, but all such references are weak and won't prevent an object from being collected given that there are no truly strong references.(根) - 在保留树视图中，根条目是对所选对象具有引用的实体。这些引用也可以是引擎为自身目的而创建的引用。引擎具有引用对象的缓存，但所有这些引用都是弱引用，如果没有真正的强引用，它们不会阻止对象被回收。

- **(closure)**–a count of references to a group of objects through function closures. (闭包) - 通过函数闭包对一组对象的引用计数
- **(array, string, number, regexp)**–a list of object types with properties which reference an Array, String, Number or regular expression.（数组，字符串，数字，正则表达式） - 一个包含引用数组，字符串，数字或正则表达式的对象类型及其属性的列表。

- **(compiled code)**–simply, everything related to compiled code. Script is similar to a function but corresponds to a `<script>` body. **SharedFunctionInfos (SFI)** are objects standing between functions and compiled code. Functions are usually have a context, while SFIs do not.(编译代码) - 简单来说，与编译代码相关的所有内容。脚本类似于函数，但对应于`<script>`主体。SharedFunctionInfos（SFI）是介于函数和编译代码之间的对象。函数通常具有上下文，而 SFIs 则没有。

- **HTMLDivElement, HTMLAnchorElement, DocumentFragment** etc–references to elements or document objects of a particular type referenced by your code.代码中引用的文档 DOM 对象

**Example**: Try this [demo page](https://developer.chrome.com/devtools/docs/heap-profiling-summary) to understand how the Summary view can be used.

### Comparison view

Find leaked objects by comparing multiple snapshots to each other. To verify that a certain application operation doesn't create leaks (for example, usually a pair of direct and reverse operations, like opening a document, and then closing it, should not leave any garbage), you may follow the scenario below: 通过比较多个快照来查找泄漏的对象。要验证某个应用程序操作是否会导致内存泄漏（例如，通常一对直接和反向操作，比如打开一个文档，然后关闭它，不应该留下任何垃圾），您可以按照以下步骤进行：

1. Take a heap snapshot before performing an operation.在执行操作之前拍摄堆快照。
2. Perform an operation (interact with a page in some way that you believe to be causing a leak)执行操作（以某种方式与页面交互，您认为这可能导致泄漏）.
3. Perform a reverse operation (do the opposite interaction and repeat it a few times)执行相反的操作（执行相反的交互并重复几次）.
4. Take a second heap snapshot and change the view of this one to Comparison, comparing it to snapshot 1.拍摄第二个堆快照，并将其视图更改为比较视图，将其与快照 1 进行比较。

In the Comparison view, the difference between two snapshots is displayed. When expanding a total entry, added and deleted object instances are shown:
在比较视图中，显示了两个快照之间的差异。在扩展总计条目时，会显示添加和删除的对象实例。

> // FIXME 结合例子来深入理解

### Containment view

The Containment view is essentially a "bird's eye view" of your application's objects structure. It allows you to peek inside function closures, to observe VM internal objects that together make up your JavaScript objects, and to understand how much memory your application uses at a very low level.
Containment 视图实质上是您应用程序对象结构的“鸟瞰图”。它允许您窥视函数闭包的内部，观察组成您的 JavaScript 对象的 VM 内部对象，并了解您的应用程序在非常低的层次上使用了多少内存。

The view provides several entry points 该视图提供了几个入口点:

- **DOMWindow objects** are objects considered as "global" objects for JavaScript code.DOMWindow 对象被视为 JavaScript 代码的“全局”对象。
- **GC roots** are the actual GC roots used by VM's garbage. GC roots can be comprised of built-in object maps, symbol tables, VM thread stacks, compilation caches, handle scopes, global handles.GC 根是 VM 垃圾回收实际使用的 GC 根。GC 根可以由内置对象映射、符号表、VM 线程堆栈、编译缓存、句柄作用域、全局句柄组成。
- **Native objects** are browser objects "pushed" inside the JavaScript virtual machine to allow automation, for example, DOM nodes, CSS rules.原生对象是浏览器对象，被“推送”到 JavaScript 虚拟机中以实现自动化，例如 DOM 节点、CSS 规则。

## Uncover DOM leaks

The heap profiler has the ability to reflect bidirectional dependencies between browser native objects (DOM nodes, CSS rules) and JavaScript objects. This helps to discover otherwise invisible leaks happening due to forgotten detached DOM subtrees floating around.

DOM leaks can be bigger than you think. Consider the following sample - when is the #tree GC?

**Examples**: Try out this example of [leaking DOM nodes](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html) to understand where DOM nodes can leak and how to detect them. You can follow it up by also looking at this example of [DOM leaks being bigger than expected](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html).

To read more about DOM leaks and memory analysis fundamentals checkout [Finding and debugging memory leaks with the Chrome DevTools](http://slid.es/gruizdevilla/memory) by Gonzalo Ruiz de Villa.
