import { describe, expect, it, jest } from '@jest/globals';
import { formatDate } from './formatDate';

describe('formatDate Function', () => {
    const edgeCaseDate = new Date(2026, 4, 5, 4, 8, 9, 7);

    it('should format correctly with the default format (M/d/y H:m:s)', () => {
        expect(formatDate(edgeCaseDate)).toBe('5/5/2026 4:8:9');
    });

    it('should apply padding correctly for double characters (MM/dd HH:mm:ss:ff)', () => {
        expect(formatDate(edgeCaseDate, 'MM/dd/y HH:mm:ss:ff')).toBe('05/05/2026 04:08:09:07');
    });

    it('should handle different types of separators smoothly', () => {
        expect(formatDate(edgeCaseDate, 'y-M-d')).toBe('2026-5-5');
        expect(formatDate(edgeCaseDate, 'H.m.s')).toBe('4.8.9');
        expect(formatDate(edgeCaseDate, 'y / M / d')).toBe('2026 / 5 / 5');
    });

    it('should perfectly handle the midnight edge case (00:00:00)', () => {
        const midnightDate = new Date(2026, 11, 31, 0, 0, 0, 0);
        expect(formatDate(midnightDate, 'HH:mm:ss:f')).toBe('00:00:00:0');
        expect(formatDate(midnightDate, 'H:m:s')).toBe('0:0:0');
    });

    it('should correctly format months spanning two digits (October to December)', () => {
        const lateYearDate = new Date(2026, 10, 25, 14, 30, 45, 150);
        expect(formatDate(lateYearDate, 'MM/dd/y')).toBe('11/25/2026');
    });

    it('should use the current system date if absolutely no arguments are provided', () => {
        jest.useFakeTimers();
        const mockSystemDate = new Date(2026, 0, 1, 12, 0, 0);
        jest.setSystemTime(mockSystemDate);

        expect(formatDate()).toBe('1/1/2026 12:0:0');

        jest.useRealTimers();
    });
});