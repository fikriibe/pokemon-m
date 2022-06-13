export function removeDuplicate<T = any>(
  list: T[],
  divider: (item: T) => string | number,
): T[] {
  return list.filter(
    (item, index, array) =>
      index === array.findIndex(i => divider(i) === divider(item)),
  );
}
