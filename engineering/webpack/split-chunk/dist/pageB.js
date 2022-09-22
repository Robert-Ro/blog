!(function (e) {
  function n(n) {
    for (var t, c, u = n[0], s = n[1], i = n[2], p = 0, f = []; p < u.length; p++)
      (c = u[p]), Object.prototype.hasOwnProperty.call(o, c) && o[c] && f.push(o[c][0]), (o[c] = 0)
    for (t in s) Object.prototype.hasOwnProperty.call(s, t) && (e[t] = s[t])
    for (l && l(n); f.length; ) f.shift()()
    return a.push.apply(a, i || []), r()
  }
  function r() {
    for (var e, n = 0; n < a.length; n++) {
      for (var r = a[n], t = !0, u = 1; u < r.length; u++) {
        var s = r[u]
        0 !== o[s] && (t = !1)
      }
      t && (a.splice(n--, 1), (e = c((c.s = r[0]))))
    }
    return e
  }
  var t = {},
    o = { pageB: 0 },
    a = []
  function c(n) {
    if (t[n]) return t[n].exports
    var r = (t[n] = { i: n, l: !1, exports: {} })
    return e[n].call(r.exports, r, r.exports, c), (r.l = !0), r.exports
  }
  ;(c.e = function (e) {
    var n = [],
      r = o[e]
    if (0 !== r)
      if (r) n.push(r[2])
      else {
        var t = new Promise(function (n, t) {
          r = o[e] = [n, t]
        })
        n.push((r[2] = t))
        var a,
          u = document.createElement('script')
        ;(u.charset = 'utf-8'),
          (u.timeout = 120),
          c.nc && u.setAttribute('nonce', c.nc),
          (u.src = (function (e) {
            return (
              c.p +
              '' +
              ({ 'commons-async1-async2-pageA': 'commons-async1-async2-pageA', async1: 'async1', async2: 'async2' }[
                e
              ] || e) +
              '.js'
            )
          })(e))
        var s = new Error()
        a = function (n) {
          ;(u.onerror = u.onload = null), clearTimeout(i)
          var r = o[e]
          if (0 !== r) {
            if (r) {
              var t = n && ('load' === n.type ? 'missing' : n.type),
                a = n && n.target && n.target.src
              ;(s.message = 'Loading chunk ' + e + ' failed.\n(' + t + ': ' + a + ')'),
                (s.name = 'ChunkLoadError'),
                (s.type = t),
                (s.request = a),
                r[1](s)
            }
            o[e] = void 0
          }
        }
        var i = setTimeout(function () {
          a({ type: 'timeout', target: u })
        }, 12e4)
        ;(u.onerror = u.onload = a), document.head.appendChild(u)
      }
    return Promise.all(n)
  }),
    (c.m = e),
    (c.c = t),
    (c.d = function (e, n, r) {
      c.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r })
    }),
    (c.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (c.t = function (e, n) {
      if ((1 & n && (e = c(e)), 8 & n)) return e
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if ((c.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e))
        for (var t in e)
          c.d(
            r,
            t,
            function (n) {
              return e[n]
            }.bind(null, t)
          )
      return r
    }),
    (c.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return c.d(n, 'a', n), n
    }),
    (c.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n)
    }),
    (c.p = ''),
    (c.oe = function (e) {
      throw (console.error(e), e)
    })
  var u = (window.webpackJsonp = window.webpackJsonp || []),
    s = u.push.bind(u)
  ;(u.push = n), (u = u.slice())
  for (var i = 0; i < u.length; i++) n(u[i])
  var l = s
  a.push([5, 'commons-pageA-pageB-pageC', 'commons-pageB-pageC']), r()
})({
  5: function (e, n, r) {
    'use strict'
    r.r(n)
    r(0),
      r(1),
      (n.default = () => {
        Promise.all([r.e('commons-async1-async2-pageA'), r.e('async1')]).then(r.bind(null, 6)),
          Promise.all([r.e('commons-async1-async2-pageA'), r.e('async2')]).then(r.bind(null, 7)),
          console.log('pageB')
      })
  },
})
