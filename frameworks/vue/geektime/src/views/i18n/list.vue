<!-- <template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.name">{{ item.name }}</li>
        </ul>
    </div>
</template> -->
<script>
// 带国际化的属性，一个是放在computed里面，一个是methods里面
// FIXME how to handle this
// callee -> identifier 'h' ?
export default {
    computed: {
        items() {
            return [
                {
                    name: this.$t('item1'), // -> ObjectExpression
                },
                {
                    name: this.$t('item2'),
                },
                {
                    name: this.$t('item3'),
                },
            ]
        },
        obj() {
            return {
                prop1: this.$t('prop1'), // -> ObjectExpression
            }
        },
        // =======先不去考虑以下情况=======
        prop2() {
            return this.$t('prop2') // ReturnStatement -> CallExpression -> callee | arguments
        },
        prop3() {
            return this.$t('prop2') + this.$t('prop3') // 多个情况 BinaryExpression
        },
    },
    render(h) {
        return h('div', [
            h(
                'ul',
                this.items.map((item) => {
                    return h(
                        'li',
                        {
                            key: item.name,
                            attrs: {
                                ['data-i18n']: item['data-i18n'],
                            },
                        },
                        [item.name]
                    )
                })
            ),
        ])
    },
}
</script>
