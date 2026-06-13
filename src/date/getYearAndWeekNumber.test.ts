import { describe, expect, it, jest } from '@jest/globals';
import { getYearAndWeekNumber } from './getYearAndWeekNumber';

describe('getYearAndWeekNumber Function', () => {

    it('should correctly calculate the week for a standard mid-year date', () => {
        const midYearDate = new Date(2026, 5, 13);
        expect(getYearAndWeekNumber(midYearDate)).toEqual({ year: 2026, weekNumber: 24 });
    });

    it('should properly handle January 1st (start of the year)', () => {
        const janFirst = new Date(2024, 0, 1);
        expect(getYearAndWeekNumber(janFirst)).toEqual({ year: 2024, weekNumber: 1 });
    });

    it('should properly handle December 31st (end of a leap year)', () => {
        const dec31 = new Date(2024, 11, 31);
        expect(getYearAndWeekNumber(dec31)).toEqual({ year: 2024, weekNumber: 53 });
    });

    it('should handle a year that starts on a Sunday without returning week 0 (Edge Case)', () => {
        const sundayStart = new Date(2023, 0, 1);
        expect(getYearAndWeekNumber(sundayStart)).toEqual({ year: 2023, weekNumber: 1 });
    });

    it('should use the current system date if no date is provided', () => {
        jest.useFakeTimers();
        const mockSecondWeek = new Date(2024, 0, 8);
        jest.setSystemTime(mockSecondWeek);

        expect(getYearAndWeekNumber()).toEqual({ year: 2024, weekNumber: 2 });

        jest.useRealTimers();
    });
});