import { describe, expect, it, jest } from '@jest/globals';
import { getMonthName } from './getMonthName';

describe('getMonthName Function', () => {
    const januaryDate = new Date(2026, 0, 15);
    const mayDate = new Date(2026, 4, 20);

    it('should return the correct month in the default locale (en-US)', () => {
        expect(getMonthName(januaryDate)).toBe('January');
        expect(getMonthName(mayDate)).toBe('May');
    });

    it('should return the correct month in Turkish (tr-TR)', () => {
        expect(getMonthName(januaryDate, 'tr-TR')).toBe('Ocak');
        expect(getMonthName(mayDate, 'tr-TR')).toBe('Mayıs');
    });

    it('should return the lowercase month name naturally in Spanish (es-ES)', () => {
        expect(getMonthName(januaryDate, 'es-ES')).toBe('enero');
        expect(getMonthName(mayDate, 'es-ES')).toBe('mayo');
    });

    it('should use the current system date if absolutely no arguments are provided', () => {
        jest.useFakeTimers();
        const mockAugustDate = new Date(2026, 7, 10);
        jest.setSystemTime(mockAugustDate);

        expect(getMonthName()).toBe('August');

        expect(getMonthName(undefined, 'tr-TR')).toBe('Ağustos');

        jest.useRealTimers();
    });

    it('should fall back smoothly for structurally valid but unknown locales', () => {
        const systemDefault = januaryDate.toLocaleDateString(undefined, { month: 'long' });

        expect(getMonthName(januaryDate, 'unknown-weird-locale')).toBe(systemDefault);
    });

    it('should throw a RangeError if a structurally invalid locale string is provided', () => {
        expect(() => getMonthName(januaryDate, 'invalid_locale')).toThrow(RangeError);
    });
});