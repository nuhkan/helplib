import { describe, expect, it } from '@jest/globals';
import { formatData } from './formatData';

describe('formatData Function', () => {
    it('should replace placeholders correctly with basic object data', () => {
        const data = { name: 'Nuhkan', city: 'Istanbul' };
        const text = 'Hello {name}, welcome to {city}.';
        expect(formatData(data, text)).toBe('Hello Nuhkan, welcome to Istanbul.');
    });

    it('should replace all occurrences of a placeholder globally', () => {
        // Senin kodundaki "g" flag'i (global) çalışıyor mu?
        const data = { id: '123' };
        const text = 'ID: {id}, Reference: {id}';
        expect(formatData(data, text)).toBe('ID: 123, Reference: 123');
    });

    it('should handle non-string values (numbers/booleans) correctly', () => {
        const data = { count: 42, active: true };
        const text = 'Count: {count}, Active: {active}';
        expect(formatData(data, text)).toBe('Count: 42, Active: true');
    });

    it('should not throw if a placeholder exists in text but not in data', () => {
        // Data içinde olmayan ama metinde olan placeholder (kodun mevcut haliyle olduğu gibi bırakmalı)
        const data = { name: 'Nuhkan' };
        const text = 'Hello {name}, {missing}!';
        expect(formatData(data, text)).toBe('Hello Nuhkan, {missing}!');
    });

    it('should handle empty object or empty text', () => {
        expect(formatData({}, 'Hello {name}')).toBe('Hello {name}');
        expect(formatData({ name: 'Nuhkan' }, '')).toBe('');
    });
});