// return nested id of object

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getNestedId = (fn: any) => (o: any) =>
  [fn(o), ...(o.subRows || []).flatMap(getNestedId(fn))];
