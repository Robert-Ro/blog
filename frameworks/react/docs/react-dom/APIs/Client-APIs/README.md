# Client React DOM APIs

The `react-dom/client` APIs let you render React components on the client (in the browser). These APIs are typically used at the top level of your app to initialize your React tree. A framework may call them for you. Most of your components don’t need to import or use them.

## Client APIs

- `createRoot` lets you create a root to display React components inside a browser DOM node.
- `hydrateRoot` lets you display React components inside a browser DOM node whose HTML content was previously generated by `react-dom/server`.
