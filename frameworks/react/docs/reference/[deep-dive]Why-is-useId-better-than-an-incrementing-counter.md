# Why is useId better than an incrementing counter?

You might be wondering why `useId` is better than incrementing a global variable like `nextId++`.

The **primary benefit** of `useId` is that React ensures that it works with server rendering. During server rendering, your components generate HTML output. Later, on the client, `hydration` attaches your event handlers to the generated HTML. For hydration to work, the client output must match the server HTML.

This is very difficult to guarantee with an incrementing counter because the order in which the client components are hydrated may not match the order in which the server HTML was emitted. By calling `useId`, you ensure that hydration will work, and the output will match between the server and the client.

Inside React, `useId` is **generated from the “parent path” of the calling component**. **This is why, if the client and the server tree are the same, the “parent path” will match up regardless of rendering order**.
