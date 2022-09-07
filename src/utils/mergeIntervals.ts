import hasOverlap from "./hasOverlap";
import orderIntervals from "./orderIntervals";
import Interval from "../data/Interval";

function mergeIntervals(intervals: Interval[]): Interval[] {

    const sorted = orderIntervals(intervals);

    const pairwiseOverlap: boolean[] = [];

    sorted.reduce((l, r) => {
        pairwiseOverlap.push(hasOverlap(l, r));
        return r;
    });

    const merged: Interval[] = [];

    console.dir(pairwiseOverlap);

    return merged;
}

export default mergeIntervals;