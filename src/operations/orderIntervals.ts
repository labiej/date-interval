import { DateInterval } from "../types/DateInterval";

function comparer(left: DateInterval, right: DateInterval) : number {
    const startOrder = left.Start.compareTo(right.Start);
    if(startOrder === 0)
        return left.End.compareTo(right.End);

    return startOrder;
}

export function orderIntervals(intervals: DateInterval[]): DateInterval[] {
    return [...intervals].sort(comparer);
}