import { describe, expect, it, jest } from '@jest/globals';
import { getYearAndWeekNumber } from './getYearAndWeekNumber';

describe('getYearAndWeekNumber Function', () => {

    it('should correctly calculate the week for a standard mid-year date', () => {
        // 13 Haziran 2026 -> Yılın 24. haftası
        const midYearDate = new Date(2026, 5, 13);
        expect(getYearAndWeekNumber(midYearDate)).toEqual({ year: 2026, weekNumber: 24 });
    });

    it('should properly handle January 1st (start of the year)', () => {
        // 1 Ocak 2024 Pazartesi gününe denk gelir -> 1. hafta olmalı
        const janFirst = new Date(2024, 0, 1);
        expect(getYearAndWeekNumber(janFirst)).toEqual({ year: 2024, weekNumber: 1 });
    });

    it('should properly handle December 31st (end of a leap year)', () => {
        // 31 Aralık 2024 (Artık yıl) -> 53. hafta olmalı
        const dec31 = new Date(2024, 11, 31);
        expect(getYearAndWeekNumber(dec31)).toEqual({ year: 2024, weekNumber: 53 });
    });

    it('should handle a year that starts on a Sunday without returning week 0 (Edge Case)', () => {
        // Sınır Testi: 1 Ocak 2023 Pazar günüydü. (Pazar indexi = 0)
        // Eğer algoritmada (0 - 1) işlemi eksiye düşerse, bize 1. hafta yerine 0. hafta diyebilir!
        const sundayStart = new Date(2023, 0, 1);
        expect(getYearAndWeekNumber(sundayStart)).toEqual({ year: 2023, weekNumber: 1 });
    });

    it('should use the current system date if no date is provided', () => {
        // Zamanı donduruyoruz: 8 Ocak 2024 Pazartesi (Yılın tam olarak 2. haftası)
        jest.useFakeTimers();
        const mockSecondWeek = new Date(2024, 0, 8);
        jest.setSystemTime(mockSecondWeek);

        // Parametre vermediğimizde dondurduğumuz sistem tarihini almalı
        expect(getYearAndWeekNumber()).toEqual({ year: 2024, weekNumber: 2 });

        jest.useRealTimers();
    });
});