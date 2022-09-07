import Interval from "./data/Interval";
import hasOverlap from "./utils/hasOverlap";
import mergeIntervals from "./utils/mergeIntervals";
import orderIntervals  from "./utils/orderIntervals";

const intervals = [];

const today = new Date();



function mergeOfConsecutiveIntervalsYieldsOneInterval() {

}


const y2k = new Date(2000, 0, 1);
const sept2010 = new Date(2010, 9, 10);
const sept2019 = new Date(2019, 9, 10)
const febr2020 = new Date(2020, 1, 17);
const dec2020 = new Date(2020, 11, 25);
// [01/01/2000, null)
// [10/10/2010, 10/10/2019]

intervals.push(new Interval(sept2010, sept2019));
intervals.push(new Interval(y2k, sept2010));
intervals.push(new Interval(febr2020, dec2020));
// intervals.push(new Interval( ));
// intervals.push(new Interval( ));
// intervals.push(new Interval( ));
// intervals.push(new Interval( ));

// const hasOverlapResult = hasOverlap(intervals[0], intervals[1]);

// console.log("Result: ", intervals[0], intervals[1], hasOverlapResult);

console.dir(orderIntervals(intervals));
console.dir(mergeIntervals(intervals));
