export function formatData(data: Record<string, any>, text: string): string {
    let formattedData = text;

    for (const key in data) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        formattedData = formattedData.replace(new RegExp(`{${escapedKey}}`, 'g'), String(data[key]));
    }

    return formattedData;
}