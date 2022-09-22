<template>
  <div>
    <h1>i18n key注入DOM data-i18n 示例</h1>
    <section>
      <p>模板:</p>
      <div>{{ $t('hello') }}</div>
      <li class="item-container">
        <span>{{ $t('billing.time-fee') }}:</span>
        <span>{{ ' ' }}{{ currencySign }}</span>
        <span>{{ ' ' }}{{ item.timePrice }}/{{ $t('unit.min') }}</span>
      </li>
      <p>模板-多个key:</p>
      <span> {{ $t('gunMonitor.gunNumber') }}: {{ currencySign }}{{ $t('gun') }} </span>
      <p>组件:</p>
      <a-button type="primary">{{ $t('hello') }}</a-button>
      <a-button type="primary">
        <a-icon type="reload"></a-icon>
        {{ $t('hello') }}</a-button
      >
      <p>输入项:</p>
      <input :placeholder="$t('hello')" />
      <textarea
        :placeholder="$t('hello')"
        value="111"
      ></textarea>
    </section>
    <section>
      <p>运行时:</p>
      <a-table :columns="columns"></a-table>
      <span>{{ aa() }}</span>
      <span>{{ cc() }}</span>
    </section>
    <section>
      <test />
      <tabs />
      <form-test></form-test>
    </section>
  </div>
</template>
<script>
import Test from './test.vue'
import Tabs from './tabs.vue'
import FormTest from './form-item.vue'

export default {
  components: {
    Test,
    Tabs,
    FormTest,
  },
  computed: {
    columns() {
      return [
        {
          dataIndex: 'a',
          title: this.$t('hello'),
        },
        {
          dataIndex: 'aa',
          title: this.$t('bb'),
        },
      ]
    },
  },
  data() {
    return {
      obj: {},
      currencySign: 0,
      item: {
        timePrice: 0,
      },
    }
  },
  methods: {
    aa() {
      const item = { a: 22 }
      const a = this.$t(`a.${item.a}`)
      return a
    },
    cc() {
      const a = this.$t('aa', { count: 2 })
      return a
    },
  },
}
</script>
<style lang="less" scoped>
p {
  margin: 2em;
}
</style>
