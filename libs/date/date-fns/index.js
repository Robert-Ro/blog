import { format, formatDistance, subDays } from "date-fns";
import es from "date-fns/locale/es/index.js";
import eo from "date-fns/locale/eo/index.js";
import zhCN from "date-fns/locale/zh-CN/index.js";
import {addYears, formatWithOptions} from 'date-fns/fp/index.js'

const s = format(new Date(), "'Today is a' iiii");
console.log({ s });

console.log(formatDistance(subDays(new Date(), 3), new Date()));

const result = formatDistance(new Date(2020, 8, 1), new Date(2021, 8, 1), {
  locale: es,
});
const result2 = formatDistance(new Date(2020, 8, 1), new Date(2021, 8, 1), {
  locale: zhCN,
});

console.log(result);
console.log(result2);

const addFiveYears = addYears(5)
  const dateToString = formatWithOptions({locale: zhCN}, 'd MMM yyyy')
    // const dateToString = formatWithOptions({ locale: eo }, "d MMM yyyy");

const dates = [
  new Date(2017, 1, 1),
  new Date(2017, 1, 11),
  new Date(2017, 6, 2),
]
const toUpper = arg => String(arg).toUpperCase()

const formattedDates = dates.map(addFiveYears).map(dateToString).map(toUpper)

console.log(formattedDates)