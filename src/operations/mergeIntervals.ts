import { orderIntervals } from "./orderIntervals";
import { DateInterval } from "../types/DateInterval";

export type shouldMergeCallback = (l:DateInterval, r:DateInterval) => boolean;

export function mergeIntervals(intervals: DateInterval[], shouldMerge: shouldMergeCallback): DateInterval[] {

    const sorted = orderIntervals(intervals);

    const merged: DateInterval[] = [];

    let current: DateInterval | null = null;
    for (const interval of sorted) {
        if (current === null)
            current = interval.copy();
        else {
            if (shouldMerge(current, interval))
                current = current.merge(interval);
            else {
                merged.push(current);
                current = interval.copy();
            }
        }
    }

    if (current !== null)
        merged.push(current);

    return merged;
}
