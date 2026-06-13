/**
 * Gets the year and week number for the given date object.
 *
 * @param {Date} date - The date object to get the year and week number for. If not provided, the current date and time will be used.
 * @returns {{ year: number, weekNumber: number }} An object containing the year and week number for the specified date object.
 */
export function getYearAndWeekNumber(date: Date = new Date()): { year: number; weekNumber: number } {
    const year = date.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const daysSinceStart = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

    const startDay = startOfYear.getDay() === 0 ? 7 : startOfYear.getDay();

    const weekNumber = Math.floor((daysSinceStart + startDay - 1) / 7) + 1;

    return { year, weekNumber };
}