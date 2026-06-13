/**
 * Formats the given date object as a string using the specified format.
 *
 * @param {Date} date - The date object to format. If not provided, the current date and time will be used.
 * @param {string} format - The format string to use. Defaults to "M/d/y H:m:s".
 * @returns {string} A string representation of the date object in the specified format.
 */
export function formatDate(date: Date = new Date(), format: string = 'M/d/y H:m:s'): string {
    const map: Record<string, number> = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        f: date.getMilliseconds(),
        y: date.getFullYear(),
    };

    return format.replace(/(M+|d+|H+|m+|s+|f+|y+)/g, (match: string) => {
        const valueStr = String(map[match[0]]);

        // Match uzunluğu kadar basamaklı olması için başını '0' ile dolduruyoruz.
        // Örn: match 'MM' (2 hane) ise ve değer '11' ise, padStart hiçbir şey yapmaz ('11' döner).
        // Eğer değer '5' ise, padStart başa sıfır koyar ('05' döner).
        return match.length > 1 ? valueStr.padStart(match.length, '0') : valueStr;
    });
}