export function evaluateFormula(formula: string, values: Record<string, unknown>): number | string {
  try {
    let expr = formula;
    for (const [key, val] of Object.entries(values)) {
      const num = parseFloat(String(val ?? 0));
      expr = expr.replace(new RegExp(`\\b${key}\\b`, "g"), isNaN(num) ? "0" : String(num));
    }
    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${expr});`)();
    if (typeof result === "number" && isFinite(result)) {
      return Math.round(result * 100) / 100;
    }
    return "";
  } catch {
    return "";
  }
}
