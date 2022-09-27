import { LocalDate } from "js-joda";
import { mergeIntervals } from "../../src/operations/mergeIntervals";
import { DateInterval } from "../../src/types/DateInterval";

const startDate = LocalDate.of(2000, 1, 1);
const endDate = startDate.plusYears(12);

const targetInterval = new DateInterval(startDate, endDate);

function doesSetCoverInterval(intervals: DateInterval[], target: DateInterval): boolean {

    // Combine the individual intervals
    const merged = mergeIntervals(intervals, shouldMerge);

    // Exclude intervals that end before target.Start or start after target.End
    const relevant = merged.filter(i => !i.End.isBefore(target.Start) && !i.Start.isAfter(target.End));

    const remainingIntervals = relevant.length;

    // If there is more than 1 interval left we need to check that all of them are 
    // abutting the previous interval. When this is not
    if (remainingIntervals != 1) {
        return false;
    }

    // When only 1 interval is left we only need to ensure that 
    return relevant[0].covers(target);
}

function shouldMerge(left: DateInterval, right: DateInterval) {
    return left.overlaps(right) || left.abuts(right);
}


// Case 1:
const notCovering: DateInterval[] = [];

// returns false
const isCovering = doesSetCoverInterval(notCovering, targetInterval);

// Case 2:
const covering: DateInterval[] = [];

// returns true
const isThisCovering = doesSetCoverInterval(covering, targetInterval);