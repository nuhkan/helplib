import { describe, expect, it, jest } from '@jest/globals';
import { getDayOfWeek } from './getDayOfWeek';

describe('getDayOfWeek Function', () => {
    // Sabit tarihler belirliyoruz ki testler dünyanın her yerinde ve her zaman aynı çalışsın.
    // 13 Haziran 2026 -> Cumartesi (Saturday)
    const sampleDate = new Date(2026, 5, 13); // Aylar 0'dan başlar, 5 = Haziran

    // 29 Şubat 2024 -> Perşembe (Thursday) - Artık yıl (Leap year) sınır testi
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
        // İspanyolca'da günler normalde küçük harfle (sábado, jueves) döner.
        // Kodundaki "charAt(0).toUpperCase()" mantığının çalıştığını burada harika şekilde doğruluyoruz.
        expect(getDayOfWeek(sampleDate, 'es-ES')).toBe('Sábado');
        expect(getDayOfWeek(leapYearDate, 'es-ES')).toBe('Jueves');
    });

    it('should correctly process other global locales (e.g., German, French)', () => {
        expect(getDayOfWeek(sampleDate, 'de-DE')).toBe('Samstag'); // Almanca
        expect(getDayOfWeek(sampleDate, 'fr-FR')).toBe('Samedi');  // Fransızca
    });

    it('should use the current system date if no date is provided', () => {
        // Sistemi kandırıp zamanı donduruyoruz (Örn: 10 Mayıs 2026, Pazar)
        jest.useFakeTimers();
        const mockSunday = new Date(2026, 4, 10);
        jest.setSystemTime(mockSunday);

        // Hiçbir parametre vermiyoruz, dondurduğumuz Pazar gününü İngilizce (default) vermeli
        expect(getDayOfWeek()).toBe('Sunday');

        // Tarihi undefined geçip sadece locale vererek test ediyoruz
        expect(getDayOfWeek(undefined, 'tr-TR')).toBe('Pazar');

        // Test bittiğinde zamanı normale döndürüyoruz ki diğer testler bozulmasın
        jest.useRealTimers();
    });

    it('should fall back smoothly or ignore structurally valid but unknown locales', () => {
        // Node.js bilinmeyen bir dil kodu aldığında sistemin kendi varsayılan diline döner.
        // Bu testin hem yerel bilgisayarda hem de GitHub Actions sunucusunda hatasız geçmesi için
        // sistemin o anki doğal dinamik çıktısını alıp onunla karşılaştırıyoruz:
        const systemDefault = sampleDate.toLocaleDateString(undefined, { weekday: 'long' });
        const expectedFallback = systemDefault.charAt(0).toUpperCase() + systemDefault.slice(1);

        expect(getDayOfWeek(sampleDate, 'unknown-weird-locale')).toBe(expectedFallback);
    });

    it('should throw a RangeError if a structurally invalid locale string is provided', () => {
        // Alt tire (_) BCP 47 dil kodlarında kesinlikle yasaktır. 
        // Bunu verdiğimizde JavaScript'in affetmeyip RangeError fırlatacağından eminiz.
        expect(() => getDayOfWeek(sampleDate, 'invalid_locale')).toThrow(RangeError);
    });
});