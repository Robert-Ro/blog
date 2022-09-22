<template>
  <div>1</div>
</template>
<script>
import { formatDistance } from 'date-fns'
import { es, eo, zhCN } from 'date-fns/locale'
import { addYears, formatWithOptions } from 'date-fns/fp'
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
export default {
  data() {
    return {}
  },
  mounted() {
    const result = formatDistance(new Date(2020, 8, 1), new Date(2021, 8, 1), {
      locale: es,
    })
    const result2 = formatDistance(new Date(2020, 8, 1), new Date(2021, 8, 1), {
      locale: zhCN,
    })

    console.log(result)
    console.log(result2)

    const addFiveYears = addYears(5)
    const dateToString = formatWithOptions({ locale: zhCN }, 'd MMM yyyy')
    // const dateToString = formatWithOptions({ locale: eo }, "d MMM yyyy");
    // const dateToString = format(new Date(), "yyyy-MM-dd");
    // console.log(dateToString);
    const dates = [new Date(2017, 4, 1), new Date(2017, 1, 11), new Date(2017, 6, 2)]
    const toUpper = (arg) => String(arg).toUpperCase()

    const formattedDates = dates.map(addFiveYears).map(dateToString).map(toUpper).join('/')

    console.log(formattedDates, '===')

    //  const datetime = Temporal.DateTime.from('2020-07-20T12:37')
    //  console.log(datetime)
  },
}
</script>
