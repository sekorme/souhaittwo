// utils/theme.ts
export function isColorDark(hex: string): boolean {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance < 128;
}
