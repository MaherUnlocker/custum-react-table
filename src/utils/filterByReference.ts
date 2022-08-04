// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterByReference = (
  tableRow: any,
  nestedRowsId: string[],
  isIncluded = true
) =>
  tableRow.filter((el: any): any =>
    isIncluded
      ? nestedRowsId.find((element) => element === el.id)
      : !nestedRowsId.find((element) => element === el.id)
  );
