<template>
    <div>
        <section>
            <p>模板:</p>
            <div>{{ $t('hello') }}</div>
            <li class="item-container">
                <span>{{ $t('billing.time-fee') }}:</span>
                <span>{{ ' ' }}{{ currencySign }}</span>
                <span>{{ ' ' }}{{ item.timePrice }}/{{ $t('unit.min') }}</span>
            </li>
            <p>模板-多个key:</p>
            <span>
                {{ $t('gunMonitor.gunNumber') }}: {{ currencySign
                }}{{ $t('gun') }}
            </span>
            <p>组件:</p>
            <a-button type="primary">{{ $t('hello') }}</a-button>
            <p>输入项:</p>
            <input :placeholder="$t('hello')" />
            <textarea :placeholder="$t('hello')" value="111"></textarea>
        </section>
        <section>
            <p>运行时:</p>
            <a-table :columns="columns"></a-table>
        </section>
    </div>
</template>
<script>
export default {
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
}
</script>
<style lang="less" scoped>
p {
    margin: 2em;
}
</style>
