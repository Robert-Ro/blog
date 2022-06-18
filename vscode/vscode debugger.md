`debugger`可以让我们看到代码实际的执行路线，每一个变量的变化。可以大段大段代码跳着看，也可以对某段逻辑一步步的执行来看。

## Launch configurations

### Launch versus attach configurations

> `launch`与`attach`模式解释

In VS Code, there are two core debugging modes, **Launch** and **Attach**, which handle two different workflows and segments of developers. Depending on your workflow, it can be confusing to know what type of configuration is appropriate for your project.

- If you come from a browser Developer Tools background, you might not be used to "launching from your tool," since your browser instance is already open. When you open DevTools, you are simply attaching DevTools to your open browser tab.
- On the other hand, if you come from a server or desktop background, it's quite normal to have your editor launch your process for you, and your editor automatically attaches its debugger to the newly launched process.

The best way to explain the difference between launch and attach is to think of a

- **launch configuration** as a recipe for _how to start your app in debug mode before VS Code attaches to it_,
- while an **attach configuration** is a recipe for how to connect VS Code's _debugger to an app or process that's already running_.

## Launch.json attributes

### The following attributes are mandatory 固定的 for every launch configuration:

- `type` - the type of debugger to use for this launch configuration. _Every installed debug extension introduces a type_: `node` for the built-in Node debugger, for example, or `php` and `go` for the PHP and Go extensions.
- `request` - the request type of this launch configuration. Currently, `launch` and `attach` are supported.
- `name` - the _reader-friendly name_ to appear in the Debug launch configuration dropdown.

### Here are some optional attributes available to all launch configurations:

- `presentation` - using the `order`, `group`, and `hidden` attributes in the `presentation` object, you can sort, group, and hide configurations and compounds in the Debug configuration dropdown and in the Debug quick pick.
- `preLaunchTask` - to launch a task before the start of a debug session, set this attribute to the label of a task specified in [tasks.json](https://code.visualstudio.com/docs/editor/tasks) (in the workspace's `.vscode` folder). Or, this can be set to `${defaultBuildTask}` to use your default build task.
- `postDebugTask` - to launch a task at the very end of a debug session, set this attribute to the name of a task specified in [tasks.json](https://code.visualstudio.com/docs/editor/tasks) (in the workspace's `.vscode` folder).
- `internalConsoleOptions` - this attribute controls the visibility of the Debug Console panel during a debugging session.
- `debugServer` - **for debug extension authors only**: this attribute allows you to connect to a specified port instead of launching the debug adapter.
- `serverReadyAction` - if you want to open a URL in a web browser whenever the program under debugging outputs a specific message to the debug console or integrated terminal. For details see [section Automatically open a URI when debugging a server program](https://code.visualstudio.com/docs/editor/debugging#_automatically-open-a-uri-when-debugging-a-server-program) below.

### Many debuggers support some of the following attributes:

- `program` - executable or file to run when launching the debugger
- `args` - arguments passed to the program to debug
- `env` - environment variables (the value `null` can be used to "undefine" a variable)
- `envFile` - path to dotenv file with environment variables
- `cwd` - current working directory for finding dependencies and other files
- `port` - port when attaching to a running process
- `stopOnEntry` - break immediately when the program launches
- `console` - what kind of console to use, for example, `internalConsole`, `integratedTerminal`, or `externalTerminal`

## Variable substitution

VS Code makes commonly used paths and other values available as `variables` and supports `variable substitution` inside strings in `launch.json`.

- `${workspaceFolder}`: gives the root path of a workspace folder
- `${file}`: the file open in the active editor(调试代码方便)
- `${env:Name}`: the **environment variable** 'Name'

full list of predefined variables in the [Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference) or by invoking intelliSence insider the `launch.json` string attributes.

## Platform-specific properties

`Launch.json` supports defining values (for example, arguments to be passed to the program) that **depend on the operating system where the debugger is running**. To do so, put a platform-specific literal into the `launch.json` file and specify the corresponding properties inside that literal.

Valid operating properties are `"windows"` for Windows, `"linux"` for Linux, and `"osx"` for macOS. Properties defined in an operating system specific scope **override properties defined in the global scope**.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "osx": {
        "stopOnEntry": false
        // ...
      },
      "linux": {
        "stopOnEntry": false
        // ...
      },
      "windows": {
        "stopOnEntry": false
        // ...
      }
    }
  ]
}
```

## `Global launch configuration`

> 作用: ?

VS Code supports adding a `"launch"` object inside your User [settings](https://code.visualstudio.com/docs/getstarted/settings). This `"launch"` configuration will then be shared across your workspaces. For example:

```json
"launch": {
    "version": "0.2.0",
    "configurations": [{
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${file}"
    }]
}
```

## `Advanced breakpoint topics`

### Conditional breakpoints 条件断点

- `Expression condition`: The breakpoint will be hit whenever the expression evaluates to `true`
- `Hit count`: The `'hit count'` controls how many times a breakpoint needs to be hit before it will 'break' execution. Whether a `'hit count'` is respected and the exact syntax of the expression vary among debugger extensions.
  > 执行次数, 可用于循环中特定次数以上`debug`

### Inline breakpoints 行内断点

> 同一行中的多个可断点表达式

Inline breakpoints will only be hit when the execution reaches the column associated with the inline breakpoint. This is particularly useful when debugging minified code which contains multiple statements in a single line.

An inline breakpoint can be set using `Shift+F9` or through the context menu during a debug session. Inline breakpoints are shown inline in the editor.

_Inline breakpoints can also have conditions_. Editing multiple breakpoints on a line is possible through the context menu in the editor's left margin.

### Function breakpoints

Instead of placing breakpoints directly in source code, a debugger can support **creating breakpoints by specifying a function name**. **This is useful in situations where source is not available but a function name is known**.

A function breakpoint is created by pressing the + button in the **BREAKPOINTS** section header and entering the function name. Function breakpoints are shown with a red triangle in the **BREAKPOINTS** section.

### Data breakpoints

If a debugger supports data breakpoints, they can be set from the **VARIABLES** view and will get hit when the value of the underlying variable changes. Data breakpoints are shown with a red hexagon(红色的六边形) in the **BREAKPOINTS** section.

## Debug Consoe REPL

可在`Debug Console`中执行代码，跟`chrome dev-tools`中一样

## Redirect input/output to/from the debug target

> 重定向输入输出?

Redirecting input/output is debugger/runtime specific, so VS Code does not have a built-in solution that works for all debuggers.

Here are two approaches you might want to consider:

1. Launch the program to debug ("debug target") manually in a terminal or command prompt and redirect input/output as needed. Make sure to pass the appropriate command line options to the debug target so that a debugger can attach to it. Create and run an "attach" debug configuration that attaches to the debug target.

2. If the debugger extension you are using can run the debug target in VS Code's Integrated Terminal (or an external terminal), you can try to pass the shell redirect syntax (for example, "<" or ">") as arguments.

example:

```json
{
  "name": "launch program that reads a file from stdin",
  "type": "node",
  "request": "launch",
  "program": "program.js",
  "console": "integratedTerminal",
  "args": ["<", "in.txt"]
}
```

## Multi-target debugging

> 参考之前调试`node` + `C++`代码例子

For **complex scenarios involving more than one process** (for example, a client and a server), **VS Code supports multi-target debugging**.

Using multi-target debugging is **simple**: _after you've started a first debug session_, you can _just launch another session_. **As soon as a second session is up and running, the VS Code UI switches to multi-target mode**:

### Compound launch configurations

An alternative way to start multiple debug sessions is by using a **compound 混合型** launch configuration 配置项. A compound launch configuration lists the names of two or more launch configurations that should be launched in parallel. Optionally a `preLaunchTask` can be specified that is run before the individual debug sessions are started.

example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Server",
      "program": "${workspaceFolder}/server.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Client",
      "program": "${workspaceFolder}/client.js"
    }
  ],
  "compounds": [
    {
      "name": "Server/Client",
      "configurations": ["Server", "Client"],
      "preLaunchTask": "${defaultBuildTask}"
    }
  ]
}
```

## Remote debugging

> Other lanuage should use plugins

Vscode only support: the `Node.js` debugger included in VS Code supports remote debugging. See the [Node.js Debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_remote-debugging) topic to learn how to configure this.

## Automatically open a URI when debugging a server program

Developing a web program typically requires opening a specific URL in a web browser in order to hit the server code in the debugger. VS Code has a built-in feature "**serverReadyAction**" to automate this task.

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${workspaceFolder}/app.js",

  "serverReadyAction": {
    "pattern": "listening on port ([0-9]+)",
    "uriFormat": "http://localhost:%s",
    "action": "openExternally"
  }
}
```

- pattern: describes the regular expression for matching the program's output string that announces the port, 使用正则匹配
- uriFormat: describes how the port number is turned into a URI. The first `%s` is substituted by the first capture group of the matching pattern

## Reference

- [vscode debugging](https://code.visualstudio.com/docs/editor/debugging)
- [browser-debugging](https://code.visualstudio.com/docs/nodejs/browser-debugging)
- [nodejs-debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
