import Interval from "../data/Interval";
import orderIntervals from "./orderIntervals";

function hasOverlap(one: Interval, two: Interval, log = false) : boolean {

    if (one.EndTime === null && one.StartTime <= two.StartTime) {
        log && console.info("case 1 - ONE active, TWO started after ONE");
        return true;
    }

    if (two.EndTime === null && two.StartTime <= one.StartTime) {
        log && console.info("case 2 - TWO active, ONE started after TWO");
        return true;
    }

    const ordered = orderIntervals([one, two]);

    if (ordered[0].EndTime < ordered[1].StartTime) {
        log && console.info("Case 3 - the earliest interval ended before the last interval");
        return false;
    }

    return true;
}

export default hasOverlap;