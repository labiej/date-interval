import Interval from "../data/Interval";

function orderIntervals(intervals: Interval[]): Interval[] {
    return intervals.sort((l, r) => l.isBefore(r));
}

export default orderIntervals;