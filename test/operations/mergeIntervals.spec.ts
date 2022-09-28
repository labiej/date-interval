import { mergeIntervals, shouldMergeCallback } from '../../src/operations/mergeIntervals';
import { LocalDate } from 'js-joda';
import { DateInterval } from '../../src/types/DateInterval';
import { dec2020, feb2020, sep2010, sep2019, y2k } from '../data/data.spec';

const hasOverlap: shouldMergeCallback = (l, r,) => l.overlaps(r);

describe('merging intervals', () => {


    it('should handle empty arrays', () => {

        const input: DateInterval[] = [];

        const merged = mergeIntervals(input, hasOverlap);

        expect(merged).toEqual([]);
        expect(merged).not.toBe(input);
    });

    it('should handle arrays with a single item', () => {

        const input: DateInterval[] = [new DateInterval(LocalDate.now().minusMonths(3))];

        const ordered = mergeIntervals(input, hasOverlap);

        expect(ordered).toEqual(input);
    });
});

describe('merging overlapping intervals', () => {

    it('should merge all when they all overlap', () => {
        const input = [
            new DateInterval(y2k, sep2010),
            new DateInterval(sep2010.minusWeeks(1), feb2020),
            new DateInterval(sep2019, dec2020)
        ];

        const merged = mergeIntervals(input, (l, r) => l.overlaps(r));

        const expected = [new DateInterval(y2k, dec2020)];

        expect(merged.length).toBe(1);
        expect(merged).toEqual(expected);
    });

    it('should not merge non-overlapping intervals', () => {
        const input = [
            new DateInterval(y2k, sep2010),
            new DateInterval(sep2019, dec2020),
            new DateInterval(dec2020.minusWeeks(10))
        ];

        const merged = mergeIntervals(input, (l, r) => l.overlaps(r));

        const expected = [new DateInterval(y2k, sep2010), new DateInterval(sep2019)];

        expect(merged.length).toBe(2);
        expect(merged).toEqual(expected);
    });
});