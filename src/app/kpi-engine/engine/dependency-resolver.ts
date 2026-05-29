import type { IDependencyRule } from "../schema/kpi-engine-types";

export function isFieldVisible(
  dependsOn: IDependencyRule | undefined,
  values: Record<string, unknown>
): boolean {
  if (!dependsOn) return true;

  const actual = values[dependsOn.fieldId];
  const expected = dependsOn.value;

  switch (dependsOn.operator) {
    case "equals":
      return String(actual) === String(expected);
    case "not_equals":
      return String(actual) !== String(expected);
    case "greater_than":
      return parseFloat(String(actual)) > parseFloat(String(expected));
    case "less_than":
      return parseFloat(String(actual)) < parseFloat(String(expected));
    default:
      return true;
  }
}
