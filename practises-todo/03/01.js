'use strict'
window.onload = function () {
  var getEleOffset = function (el) {
    var offsetTop = el.offsetTop
    var offsetLeft = el.offsetLeft
    var parentEl = el.parentElement
    if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.tagName) === 'body') {
      return {
        left: offsetLeft,
        top: offsetTop,
      }
    }
    return {
      left: 0,
      top: 0,
    }
  }
  var ele = document.getElementById('div-0-0-1-0')
  if (ele) {
    console.log(getEleOffset(ele))
  }
}
