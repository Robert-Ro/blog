type Tytpe = 1 | 2 | 3
type AttributeValue = string | number

interface Node {
  tag: string
  type: Type
  staticRoot: boolean
  static: boolean
  plain: boolean
  parent?: Node
  attrsList: Record<string, AttributeValue>[]
  attrsMap: Record<string, AttributeValue>
  children: Node[]
  text?: string
  expression?: string
}
