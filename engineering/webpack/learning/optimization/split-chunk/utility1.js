import utility2 from './utility2'
// import async1 from './async1'

export default () => {
  import('./async1').then((mod) => {
    mod.default()
  })
  console.log('utility1')
}
