import { describe, expect, it } from '@jest/globals';
import { formatString } from './formatString';

describe('formatString Function', () => {

    it('should replace single and multiple placeholders correctly', () => {
        const text = "Hello {0}, you have {1} new messages.";
        expect(formatString(text, "Nuhkan", 5)).toBe("Hello Nuhkan, you have 5 new messages.");
    });

    it('should replace multiple occurrences of the same placeholder (global replacement)', () => {
        const text = "{0} + {0} = 2 times {0}";
        expect(formatString(text, 5)).toBe("5 + 5 = 2 times 5");
    });

    it('should correctly handle different data types (numbers, booleans, null)', () => {
        const text = "Num: {0}, Bool: {1}, Null: {2}";
        expect(formatString(text, 42, true, null)).toBe("Num: 42, Bool: true, Null: null");
    });

    it('should throw an Error if no parameters are provided', () => {
        const text = "Hello {0}";

        expect(() => formatString(text)).toThrow("Invalid input: params is missing.");
    });

    it('should leave placeholders unchanged if corresponding parameter is missing', () => {
        const text = "Hello {0}, {1}!";
        expect(formatString(text, "Nuhkan")).toBe("Hello Nuhkan, {1}!");
    });

    it('should ignore extra parameters that do not have matching placeholders', () => {
        const text = "Only one: {0}";
        expect(formatString(text, "Yes", "Extra1", "Extra2")).toBe("Only one: Yes");
    });

    it('should handle empty text gracefully', () => {
        expect(formatString("", "test")).toBe("");
    });

    it('should return the original text if it has no placeholders but params are given', () => {
        expect(formatString("No placeholders here.", "param1")).toBe("No placeholders here.");
    });
});