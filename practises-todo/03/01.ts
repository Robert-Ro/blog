window.onload = () => {
  const getEleOffset = (el: HTMLElement): { left: number; top: number } => {
    const offsetTop = el.offsetTop
    const offsetLeft = el.offsetLeft
    const parentEl = el.parentElement
    if (parentEl?.tagName === 'body') {
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
  const ele = document.getElementById('div-0-0-1-0')
  if (ele) {
    console.log(getEleOffset(ele))
  }
}
