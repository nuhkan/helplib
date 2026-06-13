import { describe, expect, it } from '@jest/globals';
import { generateId } from './generateId';

describe('generateId Function', () => {

    it('should generate an ID with the default length of 11 when no length is provided', () => {
        const id = generateId();
        expect(typeof id).toBe('string');
        expect(id.length).toBe(11);
    });

    it('should generate an ID with a precisely specified valid length (e.g., 8 or 14)', () => {
        expect(generateId(8).length).toBe(8);
        expect(generateId(14).length).toBe(14);
    });

    it('should firmly clamp the length to the minimum (6) if a smaller value is passed', () => {
        expect(generateId(5).length).toBe(6);
        expect(generateId(1).length).toBe(6);

        expect(generateId(-10).length).toBe(6);
    });

    it('should firmly clamp the length to the maximum (15) if a larger value is passed', () => {
        expect(generateId(16).length).toBe(15);
        expect(generateId(100).length).toBe(15);
    });

    it('should generate a string containing purely numeric characters', () => {
        const id = generateId();

        expect(id).toMatch(/^\d+$/);
    });

    it('should generate highly unique IDs on extremely rapid consecutive calls', () => {
        const id1 = generateId(10);
        const id2 = generateId(10);
        const id3 = generateId(10);

        expect(id1).not.toBe(id2);
        expect(id2).not.toBe(id3);
        expect(id1).not.toBe(id3);
    });
});