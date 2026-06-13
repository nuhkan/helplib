import { describe, expect, it } from '@jest/globals';
import { generatePassword } from './generatePassword';

describe('generatePassword Function', () => {

    it('should generate a password with the default length of 8 when no arguments are provided', () => {
        const password = generatePassword();
        expect(typeof password).toBe('string');
        expect(password.length).toBe(8);
    });

    it('should generate a password of the exactly requested length if it is 8 or greater', () => {
        expect(generatePassword(12).length).toBe(12);
        expect(generatePassword(32).length).toBe(32);
    });

    it('should firmly enforce the minimum length of 8 if a smaller or negative value is provided', () => {
        expect(generatePassword(5).length).toBe(8);
        expect(generatePassword(1).length).toBe(8);
        expect(generatePassword(0).length).toBe(8);
        expect(generatePassword(-10).length).toBe(8);
    });

    it('should perfectly adhere to the defined alphanumeric charset', () => {
        const password = generatePassword(100);

        expect(password).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('should generate highly unique passwords on consecutive calls', () => {
        const pass1 = generatePassword(12);
        const pass2 = generatePassword(12);
        const pass3 = generatePassword(12);

        expect(pass1).not.toBe(pass2);
        expect(pass2).not.toBe(pass3);
        expect(pass1).not.toBe(pass3);
    });
});