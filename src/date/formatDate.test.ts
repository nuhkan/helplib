import { describe, expect, it, jest } from '@jest/globals';
import { formatDate } from './formatDate';

describe('formatDate Function', () => {
    // Sınırları zorlamak için tek haneli ay, gün, saat ve milisaniye içeren özel bir tarih oluşturuyoruz.
    // Tarih: 5 Mayıs 2026, Saat: 04:08:09 ve 7 milisaniye
    const edgeCaseDate = new Date(2026, 4, 5, 4, 8, 9, 7);

    it('should format correctly with the default format (M/d/y H:m:s)', () => {
        // Fonksiyona format vermezsek varsayılan değerleri kullanmalı
        expect(formatDate(edgeCaseDate)).toBe('5/5/2026 4:8:9');
    });

    it('should apply padding correctly for double characters (MM/dd HH:mm:ss:ff)', () => {
        // Senin yazdığın "match.length > 1" padding mantığını (5 yerine 05 yapma) zorluyoruz
        expect(formatDate(edgeCaseDate, 'MM/dd/y HH:mm:ss:ff')).toBe('05/05/2026 04:08:09:07');
    });

    it('should handle different types of separators smoothly', () => {
        // Kullanıcı araya çizgi, nokta veya boşluk koyarsa bozulmamalı
        expect(formatDate(edgeCaseDate, 'y-M-d')).toBe('2026-5-5');
        expect(formatDate(edgeCaseDate, 'H.m.s')).toBe('4.8.9');
        expect(formatDate(edgeCaseDate, 'y / M / d')).toBe('2026 / 5 / 5');
    });

    it('should perfectly handle the midnight edge case (00:00:00)', () => {
        // En çok hata veren sınır değeri: Gece tam 12
        const midnightDate = new Date(2026, 11, 31, 0, 0, 0, 0); // 31 Aralık 2026 00:00:00
        expect(formatDate(midnightDate, 'HH:mm:ss:f')).toBe('00:00:00:0');
        expect(formatDate(midnightDate, 'H:m:s')).toBe('0:0:0');
    });

    it('should correctly format months spanning two digits (October to December)', () => {
        // Çift haneli aylarda ve günlerde padding (0) eklememesi gerektiğini test ediyoruz
        const lateYearDate = new Date(2026, 10, 25, 14, 30, 45, 150); // 25 Kasım 2026
        expect(formatDate(lateYearDate, 'MM/dd/y')).toBe('11/25/2026'); // Ay indexi 10 -> 11. ay
    });

    it('should use the current system date if absolutely no arguments are provided', () => {
        // "date = new Date()" varsayılan parametresini test etmek için Jest ile sistemi kandırıyoruz
        jest.useFakeTimers();
        const mockSystemDate = new Date(2026, 0, 1, 12, 0, 0); // 1 Ocak 2026 12:00
        jest.setSystemTime(mockSystemDate);

        // Hiç parametre göndermiyoruz, dondurduğumuz sistem saatini almalı
        expect(formatDate()).toBe('1/1/2026 12:0:0');

        // Test bittiğinde sistem saatini tekrar normale (gerçek zamana) döndürüyoruz
        jest.useRealTimers();
    });
});