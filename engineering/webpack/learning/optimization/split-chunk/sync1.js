import utility1 from './utility1'
import { capitalize, uuid } from '@liutsing/utils'

export default () => {
  console.log(capitalize('abc'), uuid())
}
