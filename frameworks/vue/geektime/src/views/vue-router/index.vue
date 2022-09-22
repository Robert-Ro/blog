<template>
  <div>
    <div>{{ JSON.stringify(dataSource) }}</div>
    <router-link :to="`/vue-router/${Math.random()}`">jump</router-link>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      dataSource: {},
    }
  },
  methods: {
    query(id) {
      axios.get('http://10.239.17.56:38080/app/mock/2/example/1646125806858').then((res) => {
        this.dataSource = res.data
      })
    },
  },
  mounted() {
    console.log('mounted')
    const { id } = this.$route.query
    this.query(id)
  },
  created() {
    console.log('created')
  },
  updated() {
    console.log('updated')
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter', to, from)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate', to, from)
    this.query(to.query.id)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave', to, from)
    next()
  },
}
</script>
