/**
 * Generate a unique ID.
 *
 * @param {number} length - The length of the generated ID. Default is 11.
 * @returns {string} - The generated ID.
 */
export function generateId(length: number = 11): string {
    const maxLength = 15;
    const minLength = 6;

    if (length < minLength) {
        length = minLength;
    }
    if (length > maxLength) {
        length = maxLength;
    }

    const randomString = Math.floor(Math.random() * length);
    const timestamp = (performance.now() + Date.now()).toString().replace('.', '');
    const id = `${timestamp}${randomString}`.slice(-length);

    return id;
}