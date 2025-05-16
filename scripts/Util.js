// Extracts the numbers as an array from the expression //
export function ExtractNumbers(expression)
{
    // Matches all sequences of digits //
    const numberStrings = expression.match(/\d+/g);
    if (!numberStrings) return [];

    // Converts the matched strings to numbers //
    return numberStrings.map(Number);
}

// Helper function to format the expression //
export function FormatExpression(expr)
{
  return expr
    // Remove outermost parentheses //
    .replace(/^\((.*)\)$/, '$1')
    // Remove parentheses around additions and subtractions //
    .replace(/\(([^()]+?)\)/g, (match, inner) => {
      // Only remove if it contains only + or - operators //
      return /^[\d\s+\-]+$/.test(inner) ? inner : match;
    });
}
