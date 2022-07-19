<template>
    <div>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" :tab="$t('tab.title.1')">
                {{ $t('tab.1') }}
            </a-tab-pane>
            <!-- <a-tab-pane key="2" :tab="$t('tab.title.2')" force-render>
                {{ $t('tab.2') }}
            </a-tab-pane>
            <a-tab-pane key="3" :tab="$t('tab.title.3')">
                {{ $t('tab.3') }}
            </a-tab-pane> -->
        </a-tabs>
    </div>
</template>

<script>
/**
 * node_modules/ant-design-vue/es/vc-tabs/src/TabBarTabsNode#L77 添加`...child.data.attrs`
 */
export default {
    data() {
        return {}
    },
    methods: {
        callback(key) {
            console.log(key)
        },
    },
}
</script>
