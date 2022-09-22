<template>
  <div>
    <local-component />
  </div>
</template>
<script>
import Vue from 'vue'
import { compile } from 'vue-template-compiler'

const ast = compile(
  `
<template>
  <div>{{$t('hello')}}</div>
</template>
`,
  {
    modules: [
      {
        transformNode: (el) => {
          if (el.children.length === 1) {
            const child = el.children[0]
            if (child.type === 2) {
              const text = child.text
              const reg = new RegExp(`'(\\w+)'`)
              const matches = text.match(reg)
              if (matches) {
                const key = matches[1]
                el.attrsList.push({
                  name: 'data-i18n',
                  value: key,
                })
              }
            }
          }
        },
      },
    ],
  }
)

Vue.component('LocalComponent', {
  name: 'LocalComponent',
  template: '<div>1</div>',
})

export default {
  components: {
    // LocalComponent
  },
}
</script>
