<template>
  <div ref="chartDom" />
</template>

<script>
import * as echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash.debounce";

export default {
  props: {
    options: Object,
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    // 非深度监听方式: options每次为新值
    options(n) {
      this.chart.setOption(n);
    },
     // 深度监听方式
    // options: {
    //   handler(n) {
    //     console.log(n);
    //     this.chart.setOption(n);
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.options);
    },
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style lang="less" scoped>
div {
  height: 400px;
}
</style>
