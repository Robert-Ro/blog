;(function () {
  var c = '#41b883',
    f = '#42c02e',
    l = function (t) {
      var e = t.title,
        r = t.content,
        n = t.backgroundColor,
        i = [
          '%c '.concat(e, ' %c ').concat(r, ' '),
          'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat('#35495e', ';'),
          'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(n, ';'),
        ]
      return (
        function () {
          var t
          console && 'function' === typeof console.log && (t = console).log.apply(t, arguments)
        }.apply(void 0, i),
        i
      )
    }

  function p(t) {
    var e = t.title,
      r = t.content
    return l({
      title: e,
      content: r,
      backgroundColor: c,
    })
  }
  p({
    title: 'Product Flavor',
    content: '234',
  })
  p({
    title: 'Build Date',
    content: 'sdfsf',
  })
  p({
    title: 'Build Version',
    content: '234234',
  })
})()
