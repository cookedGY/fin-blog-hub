// Preserve stored categories and existing links while broadening the public label.
export function categoryLabel(category: string): string {
  return category === "De's Financial Takes" ? "De's Takes" : category;
}
