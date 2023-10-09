// import vendor2 from 'vendor2'
import utility2 from './utility2'
import utility3 from './utility3'
import async1 from './async1'

const PageB = () => {
  //懒加载
  import(/* webpackChunkName: "async1" */ './async1').then((mod) => {
    mod.default()
  })

  console.log('pageB', async1())
}

export default PageB
