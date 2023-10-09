// import vendor1 from 'vendor1'
import utility1 from './utility1'
import utility2 from './utility2'
import { Button, Card } from 'antd'
import React from 'react'
// import sync1 from './sync1'

const PageA = () => {
  //懒加载
  import('./async1').then((mod) => {
    mod.default()
  })
  import('./async2').then((mod) => {
    mod.default()
  })
  console.log('pageA')
  //   console.log(sync1())

  return (
    <Card>
      <Button>primary</Button>
    </Card>
  )
}

export default PageA

PageA()
