import { LocalDate } from "js-joda";

/**
 * A class representing an interval on the calendar.
 */
export class DateInterval {
    private readonly end: LocalDate;

    constructor(private readonly start: LocalDate, end?: LocalDate) {
        this.end = end || LocalDate.now();

        if (this.end.isBefore(this.start))
            throw "The start of the DateInterval must come before the end of the DateInterval";
    }

    get Start(): LocalDate {
        return this.start;
    }

    get End(): LocalDate {
        return this.end;
    }

    //#region "Relative position"

    /**
     * Checks whether this interval overlaps with the provided interval
     * @param other The other interval
     * @returns true when the intervals overlap (not abutting)
     */
    overlaps(other: DateInterval): boolean {
        if (this.start.isAfter(other.end))
            return false;
        if (this.end.isBefore(other.start))
            return false;

        return true;
    }

    /**
     * Checks whether this interval abuts the other provided interval.
     * Intervals abut when they touch but do not overlap, 
     * this means that the start time one of the intervals is exactly 1 day later than the end time of the other interval.
     * @param other The other interval
     * @returns True if the intervals are abutting
     */
    abuts(other: DateInterval): boolean {
        if (this.start.minusDays(1).equals(other.end))
            return true;
        if (this.end.plusDays(1).equals(other.start))
            return true;
        return false;
    }

    /**
     * Determines whether this interval covers the entirety of the provided interval.
     * An interval is covered when this.Start is no later than other.Start and
     * this.End is no earlier than other.End
     * @param other other interval
     * @returns True when other is covered by this interval
     */
    covers(other: DateInterval): boolean {
        if (this.start.isAfter(other.start))
            return false;
        if (this.end.isBefore(other.end))
            return false;

        return true;
    }

    //#endregion

    //#region "Creation"

    /**
     * Creates a copy to ensure we do not modify the existing instance
     * @returns A copy of the interval
     */
    copy(): DateInterval {
        return new DateInterval(this.start, this.end);
    }

    /**
     * Creates a merged interval without modifying the current instances.
     * The earliest start date and the latest end date will be used to instantiate the new interval.
     * __Remark__: This does not check if the intervals are abutting or overlapping.
     * @param other The other interval
     * @returns A new interval which covers both intervals
     */
    merge(other: DateInterval): DateInterval {
        const startTime = other.start.isBefore(this.start) ? other.Start : this.Start;
        const endTime = other.end.isAfter(this.end) ? other.end : this.end;
        return new DateInterval(startTime, endTime);
    }

    //#endregion

    toString(): string {
        return `[${this.start}, ${this.end}]`;
    }
}
