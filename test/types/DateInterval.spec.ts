import { LocalDate } from "js-joda";
import { DateInterval } from "../../src/types/DateInterval"
import { y2k, sep2010, sep2019, feb2020, dec2020 } from "../data/data.spec";

describe('creating a DateInterval instance', () => {
    it('requires that start is before end', () => {

        const start = LocalDate.now();
        const end = LocalDate.now().minusDays(1);

        expect(() => new DateInterval(start, end)).toThrow();
    });

    it('automatically selects today', () => {
        const start = LocalDate.now().minusYears(1);

        const interval = new DateInterval(start);

        expect(interval.Start).toEqual(start);
        expect(interval.End).toEqual(LocalDate.now());
    });
});

describe('DateInterval overlaps', () => {

    it('returns true when called with itself', () => {
        const interval = new DateInterval(y2k, sep2019);

        expect(interval.overlaps(interval)).toBeTrue();
    });

    it('returns true when overlapping', () => {
        const interval = new DateInterval(y2k, sep2019);
        const otherInterval = new DateInterval(sep2010, feb2020);

        expect(interval.overlaps(otherInterval)).toBeTrue();
        expect(otherInterval.overlaps(interval)).toBeTrue();
    });

    it('returns false when not overlapping', () => {
        const interval = new DateInterval(y2k, sep2019.minusYears(1));
        const otherInterval = new DateInterval(sep2019, feb2020);

        expect(interval.overlaps(otherInterval)).toBeFalse();
        expect(otherInterval.overlaps(interval)).toBeFalse();
    });

    it('returns false when abutting', () => {
        const interval = new DateInterval(y2k, sep2019.minusDays(1));
        const otherInterval = new DateInterval(sep2019, feb2020);

        expect(interval.overlaps(otherInterval)).toBeFalse();
        expect(otherInterval.overlaps(interval)).toBeFalse();
    });
});

describe('DateInterval abuts', () => {
    it('returns false when called with itself', () => {
        const interval = new DateInterval(y2k, sep2019);

        expect(interval.abuts(interval)).toBeFalse();
    });

    it('returns false when overlapping', () => {
        const interval = new DateInterval(y2k, sep2019);
        const otherInterval = new DateInterval(sep2010, feb2020);

        expect(interval.abuts(otherInterval)).toBeFalse();
        expect(otherInterval.abuts(interval)).toBeFalse();
    });

    it('returns false when not exactly a day between', () => {
        const interval = new DateInterval(y2k, sep2019.minusYears(1));
        const otherInterval = new DateInterval(sep2019, feb2020);

        expect(interval.abuts(otherInterval)).toBeFalse();
        expect(otherInterval.abuts(interval)).toBeFalse();
    });

    it('returns true when abutting', () => {
        const interval = new DateInterval(y2k, sep2019.minusDays(1));
        const otherInterval = new DateInterval(sep2019, feb2020);

        expect(interval.abuts(otherInterval)).toBeTrue();
        expect(otherInterval.abuts(interval)).toBeTrue();
    });
});

describe('DateInterval covers', () => {
    it('returns true when called with itself', () => {
        const interval = new DateInterval(y2k, sep2019);

        expect(interval.covers(interval)).toBeTrue();
    });

    it('returns false when start date is after the other intervals start date', () => {
        const interval = new DateInterval(sep2010, dec2020);
        const otherInterval = new DateInterval(y2k, feb2020);

        expect(interval.covers(otherInterval)).toBeFalse();
    });

    it('returns false when end date is before the other intervals end date', () => {
        const interval = new DateInterval(y2k, feb2020.minusYears(1));
        const otherInterval = new DateInterval(sep2019, feb2020);

        expect(interval.covers(otherInterval)).toBeFalse();
    });

    it('returns true when start date is equal and end date is after end date of the other interval', () => {
        const interval = new DateInterval(y2k, feb2020.plusDays(1));
        const otherInterval = new DateInterval(y2k, feb2020);

        expect(interval.covers(otherInterval)).toBeTrue();
    });

    it('returns true when start date is before the start date of the other interval and the end date is equal', () => {
        const interval = new DateInterval(y2k.minusDays(1), feb2020);
        const otherInterval = new DateInterval(y2k, feb2020);

        expect(interval.covers(otherInterval)).toBeTrue();
    });

    it('returns true when start date is before the start date of the other interval and the end date is equal', () => {
        const interval = new DateInterval(y2k.minusDays(1), feb2020.plusDays(1));
        const otherInterval = new DateInterval(y2k, feb2020);

        expect(interval.covers(otherInterval)).toBeTrue();
    });
});

describe('DateInterval copy', () => {

    it('creates a new instance', () => {
        const interval = new DateInterval(y2k);

        const copy = interval.copy();

        expect(copy).not.toBe(interval);
    });

    it('creates an instance with the same data', () => {
        const interval = new DateInterval(y2k);
        const copy = interval.copy();

        expect(copy).toEqual(interval);
    });
});

describe('DateInterval merge', () => {

    it('creates a new instance', () => {
        const interval = new DateInterval(y2k);
        const other = new DateInterval(sep2010);

        const merged = interval.merge(other);

        expect(merged).not.toBe(interval);
        expect(merged).not.toBe(other);
    });

    it('creates an instance with the earliest start date', () => {
        const interval = new DateInterval(y2k);
        const other = new DateInterval(sep2010);

        const merged = interval.merge(other);

        expect(merged.Start).toEqual(interval.Start);
    });

    it('creates an instance with the latest end date', () => {
        const interval = new DateInterval(y2k, dec2020);
        const other = new DateInterval(sep2010, sep2019);

        const merged = interval.merge(other);

        expect(merged.End).toEqual(interval.End);
    });

    it('creates an instance equal to a covering interval', () => {
        const first = new DateInterval(y2k, dec2020);
        const second = new DateInterval(sep2010, sep2019);

        const merged = first.merge(second);

        expect(merged).toEqual(first);
    });

    // When permutating the Start and End dates used for the instances
    // we should always get the same result.
    it('creates an instance with the earliest start date and latest end date regardless of the specific DateIntervals', () => {

        const first = new DateInterval(sep2010.minusWeeks(1), sep2019);
        const second = new DateInterval(sep2010, dec2020);

        const merged = first.merge(second);

        const third = new DateInterval(sep2010.minusWeeks(1), sep2010);
        const fourth = new DateInterval(sep2019, dec2020);

        const permutated = third.merge(fourth);

        const expected = new DateInterval(sep2010.minusWeeks(1), dec2020);
        expect(merged).toEqual(expected);
        expect(permutated).toEqual(expected);

    });

    it('is symmetric', () => {
        const first = new DateInterval(y2k, sep2010);
        const second = new DateInterval(sep2019, dec2020);

        const mergedOne = first.merge(second);
        const mergedTwo = second.merge(first);

        expect(mergedOne).toEqual(mergedTwo);

    })
});