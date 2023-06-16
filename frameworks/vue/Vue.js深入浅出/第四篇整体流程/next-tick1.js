let callbacks = []
let microTimerFunc
let pending

function flushCallbcks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0 // FIXME 为啥
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

const p = Promise.resolve()

microTimerFunc = () => {
  p.then(flushCallbcks)
}

/**
 *
 * @param {Function} cb
 * @param {*} ctx
 */
const nextTick = (cb, ctx) => {
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx)
    }
  })
  if (!pending) {
    pending = true
    microTimerFunc()
  }
}

nextTick(
  function name() {
    console.log(this.name)
  },
  { name: 'Berwin' }
)
