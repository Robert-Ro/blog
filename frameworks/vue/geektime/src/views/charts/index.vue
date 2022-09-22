<template>
  <chart :options="options" />
</template>

<script>
import Chart from '@/components/chart'
import random from 'lodash.random'
export default {
  components: {
    Chart,
  },
  data() {
    return {
      options: {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.options.series[0].data = this.options.series[0].data.map(() => random(0, 100))
      this.options = { ...this.options }
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style></style>
