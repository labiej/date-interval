import { LocalDate } from "@js-joda/core";
import { DateInterval } from '../../src/types/DateInterval';
import { orderIntervals } from '../../src/operations/orderIntervals';

describe('ordering intervals', () => {

    it('should handle empty arrays', () => {
        const input:DateInterval[] = [];

        const ordered = orderIntervals(input);

        expect(ordered).toEqual(input);
    });

    it('should handle arrys of length 1', () => {
        const input:DateInterval[] = [new DateInterval(LocalDate.now().minusMonths(3))];

        const ordered = orderIntervals(input);

        expect(ordered).toEqual(input);
    });

    it('should order the entries by Start', () => {

        const first = LocalDate.of(2010, 2, 13);
        const second = first.minusDays(7);
        const third = first.plusWeeks(12);

        const input = [
            new DateInterval(first),
            new DateInterval(second),
            new DateInterval(third)
        ];

        const expected = [
            new DateInterval(second),
            new DateInterval(first),
            new DateInterval(third)
        ];

        const ordered = orderIntervals(input);

        expect(ordered).toEqual(expected);
    });

    it('should use the End date as a tie-breaker', () => {
        const startTime = LocalDate.of(2009, 4, 28);
        const first = LocalDate.now().minusWeeks(5);
        const second = LocalDate.now().minusYears(7);
        const third = first.plusDays(7);

        // second < first < third 
        const input = [
            new DateInterval(startTime, first),
            new DateInterval(startTime, second),
            new DateInterval(startTime, third),
        ];

        const expected = [
            new DateInterval(startTime, second),
            new DateInterval(startTime, first),
            new DateInterval(startTime, third),
        ];

        const ordered = orderIntervals(input);

        expect(ordered).toEqual(expected)
    });

    it('shouldn\'t modify the input', () => {
        const first = LocalDate.of(2010, 2, 13);
        const second = first.minusDays(7);
        const third = first.plusWeeks(12);

        const input = [
            new DateInterval(first),
            new DateInterval(second),
            new DateInterval(third)
        ];

        const copy = [...input];

        orderIntervals(input);

        expect(copy).toEqual(input);
    })
});