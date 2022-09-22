# Those HTML Attributes You Never Use

## The `enterkeyhint` Attribute For Virtual Keyboards

```html
<input
  type="text"
  enterkeyhint="done"
/>
```

可选值：

- enter
- done
- go
- next
- previous
- search
- send

## The `title` Attribute On Stylesheets

[mdn 链接](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets)，兼容性有限

## The `cite` Attribute For The <`blockquote`> And <`q`> Elements

不太明白

## Attributes For Custom Ordered Lists

to customize the behaviour of the numbering that appears in such a list are:

- the `reversed` attribute, to number the items in reverse order (high to low instead of the default low to high);
- the `start` attribute, to define what number to start from;
- the `type` attribute, to define whether to use numbers, letters, or Roman numerals;
- the `value` attribute, to specify a custom number on a specific list item.

## The `download` Attribute For The <`a`> Element

## The `decoding` Attribute For The <`img`> Element

- `sync`
  Decode the image synchronously, which is generally how browsers do it.
- `async`
  Decode the image asynchronously to avoid delaying presentation of other content.
- `auto`
  The default which allows the browser to use its own built-in method of decoding.

## The `loading` Attribute For The <`iframe`> Element

As with images, the `loading` attribute accepts either a value of `eager` (the default browser behaviour) or `lazy`, which defers `loading` of the iframe’s contents until the iframe is about to enter the viewport. The only down-side to this attribute is the fact that its use on iframes is not supported in Firefox (though, Firefox does support `loading` on images).

## The `form` Attribute For Form Fields

## resouces

- [link](https://www.smashingmagazine.com/2022/03/html-attributes-you-never-use/)
- [html spec decoding-images](https://html.spec.whatwg.org/multipage/images.html#decoding-images)
