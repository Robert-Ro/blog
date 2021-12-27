# Data URLs

**Data URLs**, URLs prefixed with the **`data:` scheme**, **allow content creators to embed small files inline in documents**内嵌. They were formerly known as "data URIs" until that name was retired by the WHATWG.

## Syntax

Data URLs are composed of four parts: a prefix (`data:`), a [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) indicating the type of data, an **optional** `base64` token _if non-textual_, and the data itself:

```js
data:[<mediatype>][;base64],<data>
```

examples:

- `data:,Hello%2C%20World%21`
- `data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==`
- `data:text/html,%3Ch1%3EHello%2C%20World%21%3C%2Fh1%3E`
- `data:text/html,<script>alert('hi');</script>`

## MIME types (IANA media types)

表示：`type/subtype;parameter=value`

### type

- discrete 离散的：represent a single `file` or `medium`, such as a single text or music file, or a single video.
- multipart: represents a document that's comprised of multiple component parts

#### Discrete Type

- `application`
- `audio`
- `example`
- `font`
- `image`
- `model`
- `text`
- `video`

#### Multipart types

**Multipart** types indicate a category of document broken into pieces, often with different MIME types; they can also be used — especially in email scenarios — to represent multiple, separate files which are all part of the same transaction. They represent a **composite document**.

- message
- multipart: Data that is comprised of multiple components which may individually have different MIME types.

  - `multipart/form-data`:
  - `multipart/byteranges`:

  ## Reference

  - ⭐⭐[MIME_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
