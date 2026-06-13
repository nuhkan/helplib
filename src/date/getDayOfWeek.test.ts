import { describe, expect, it, jest } from '@jest/globals';
import { getDayOfWeek } from './getDayOfWeek';

describe('getDayOfWeek Function', () => {
    const sampleDate = new Date(2026, 5, 13);

    const leapYearDate = new Date(2024, 1, 29);

    it('should return the correct day in the default locale (en-US)', () => {
        expect(getDayOfWeek(sampleDate)).toBe('Saturday');
        expect(getDayOfWeek(leapYearDate)).toBe('Thursday');
    });

    it('should return the correct day in Turkish (tr-TR)', () => {
        expect(getDayOfWeek(sampleDate, 'tr-TR')).toBe('Cumartesi');
        expect(getDayOfWeek(leapYearDate, 'tr-TR')).toBe('Perşembe');
    });

    it('should return the correct day in Spanish (es-ES) and properly capitalize it', () => {
        expect(getDayOfWeek(sampleDate, 'es-ES')).toBe('Sábado');
        expect(getDayOfWeek(leapYearDate, 'es-ES')).toBe('Jueves');
    });

    it('should correctly process other global locales (e.g., German, French)', () => {
        expect(getDayOfWeek(sampleDate, 'de-DE')).toBe('Samstag');
        expect(getDayOfWeek(sampleDate, 'fr-FR')).toBe('Samedi');
    });

    it('should use the current system date if no date is provided', () => {
        jest.useFakeTimers();
        const mockSunday = new Date(2026, 4, 10);
        jest.setSystemTime(mockSunday);

        expect(getDayOfWeek()).toBe('Sunday');

        expect(getDayOfWeek(undefined, 'tr-TR')).toBe('Pazar');

        jest.useRealTimers();
    });

    it('should fall back smoothly or ignore structurally valid but unknown locales', () => {
        const systemDefault = sampleDate.toLocaleDateString(undefined, { weekday: 'long' });
        const expectedFallback = systemDefault.charAt(0).toUpperCase() + systemDefault.slice(1);

        expect(getDayOfWeek(sampleDate, 'unknown-weird-locale')).toBe(expectedFallback);
    });

    it('should throw a RangeError if a structurally invalid locale string is provided', () => {
        expect(() => getDayOfWeek(sampleDate, 'invalid_locale')).toThrow(RangeError);
    });
});