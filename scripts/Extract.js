export function ExtactNumbers(expression)
{
    // Matches all sequences of digits //
    const numberStrings = expression.match(/\d+/g);
    if (!numberStrings) return [];

    // Converts the matched strings to numbers //
    return numberStrings.map(Number);
}
