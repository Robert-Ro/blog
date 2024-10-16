# useId

`useId` is a React Hook for **generating unique IDs that can be passed to accessibility attributes**.用于生成唯一的 id 用于`accessibility attributes`

```js
const id = useId()
```

## Reference

### useId()

Call `useId` at the top level of your component to generate a unique ID:

```js
import { useId } from 'react'

function PasswordField() {
  const passwordHintId = useId()
  // ...
}
```

### Parameters

`useId` does not take any parameters.

### Returns

`useId` returns a unique ID string associated with this particular `useId` call in this particular component.

### Caveats

`useId` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

`useId` **should not be used to generate keys** in a list. **Keys should be generated from your data**.

## Usage

### Generating unique IDs for accessibility attributes

Call `useId` at the top level of your component to generate a unique ID:

```js
import { useId } from 'react'

function PasswordField() {
  const passwordHintId = useId()
  // ...
}
```

You can then pass the _generated ID_ to different attributes:

```js
<>
  <input type="password" aria-describedby={passwordHintId} />
  <p id={passwordHintId}>
</>
```

> a11y aria

[HTML accessibility attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) like [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) let you specify that two tags are related to each other. For example, you can specify that an element (like an input) is described by another element (like a paragraph).

In regular HTML, you would write it like this:

```js
<label>
  Password:
  <input
    type="password"
    aria-describedby="password-hint" // <-
  />
</label>
<p id="password-hint"  // <-
>
  The password should contain at least 18 characters
</p>
```

However, _hardcoding IDs_ like this is not a good practice in React. A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with `useId`:

```js
import { useId } from 'react'

function PasswordField() {
  const passwordHintId = useId() // <-
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId} // <-
        />
      </label>
      <p id={passwordHintId}>The password should contain at least 18 characters</p>
    </>
  )
}
```

#### Pitfall

With `server rendering`, **`useId` requires an identical component tree on the server and the client**. If the trees you render on the server and the client don’t match exactly, the generated IDs won’t match.

#### [Deep Dive]

[Why is useId better than an incrementing counter?](./%5Bdeep%20dive%5DWhy%20is%20useId%20better%20than%20an%20incrementing%20counter%3F.md)

### Generating IDs for several related elements

If you need to give IDs to multiple related elements, you can call `useId` to generate a shared prefix for them:

```js
import { useId } from 'react'

export default function Form() {
  const id = useId()
  return (
    <form>
      <label htmlFor={id + '-firstName'}>First Name:</label>
      <input
        id={id + '-firstName'}
        type="text"
      />
      <hr />
      <label htmlFor={id + '-lastName'}>Last Name:</label>
      <input
        id={id + '-lastName'}
        type="text"
      />
    </form>
  )
}
```

his lets you avoid calling `useId` for every single element that needs a unique ID.

### Specifying a shared prefix for all generated IDs

If you render multiple independent React applications on a single page, pass `identifierPrefix` as an option to your `createRoot` or `hydrateRoot` calls. This ensures that the IDs generated by the two different apps never clash because every identifier generated with `useId` will start with the distinct prefix you’ve specified.
