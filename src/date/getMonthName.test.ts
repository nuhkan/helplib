import { describe, expect, it, jest } from '@jest/globals';
import { getMonthName } from './getMonthName';

describe('getMonthName Function', () => {
    // Aylar 0 indexli çalışır (0: Ocak, 4: Mayıs, vs.)
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
        // İspanyolca'da ay isimleri küçük harfle yazılır.
        // Fonksiyonda toUpperCase() müdahalesi olmadığı için bunun doğal halini test ediyoruz.
        expect(getMonthName(januaryDate, 'es-ES')).toBe('enero');
        expect(getMonthName(mayDate, 'es-ES')).toBe('mayo');
    });

    it('should use the current system date if absolutely no arguments are provided', () => {
        // Sistemi kandırıp zamanı Ağustos ayına sabitliyoruz
        jest.useFakeTimers();
        const mockAugustDate = new Date(2026, 7, 10); // 7 = Ağustos
        jest.setSystemTime(mockAugustDate);

        // Hiç parametre yok, İngilizce (default) Ağustos vermeli
        expect(getMonthName()).toBe('August');

        // Tarihi boş geçip sadece Türkçe dilini zorluyoruz
        expect(getMonthName(undefined, 'tr-TR')).toBe('Ağustos');

        // Test sonu zamanı normale alıyoruz
        jest.useRealTimers();
    });

    it('should fall back smoothly for structurally valid but unknown locales', () => {
        // Node.js bilinmeyen dilde bilgisayarın varsayılan diline (System Locale) döner.
        // GitHub Actions ve yerel bilgisayar arasındaki dil farkından patlamaması için dinamik alıyoruz.
        const systemDefault = januaryDate.toLocaleDateString(undefined, { month: 'long' });

        expect(getMonthName(januaryDate, 'unknown-weird-locale')).toBe(systemDefault);
    });

    it('should throw a RangeError if a structurally invalid locale string is provided', () => {
        // BCP 47 standartlarında alt tire (_) kullanılamaz, Node.js RangeError fırlatmalıdır.
        expect(() => getMonthName(januaryDate, 'invalid_locale')).toThrow(RangeError);
    });
});