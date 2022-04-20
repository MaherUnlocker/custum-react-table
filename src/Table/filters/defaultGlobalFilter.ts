// eslint-disable-next-line
const DefaultGlobalFilter = (
  rows: any[],
  columnIds: any[],
  filterValue: string,
  options?: any
): any => {
  // Do not filter
  if (filterValue === '' || filterValue === null || filterValue === undefined) {
    return rows;
  }
  // In case of a complex filter, the parent component should provide the filter logic
  if (typeof filterValue !== 'string') {
    return [];
  }
  const textSearchValues = filterValue.trim().toLocaleLowerCase();
  const arraySearchValues = textSearchValues.split(' '); // Transform it to array of separate words
  return rows.filter((row: any) => {
    // If the id exists in options then the parent was filtred
    // And we want to display the children as well
    if (
      options &&
      Array.isArray(options.filteredIds) &&
      options.filteredIds.some((fid: any) => row.id.startsWith(fid))
    ) {
      options.filteredIds.push(row.id);
      return true;
    }
    const { values } = row;
    // The default filter will consider only the basic data format like number and string
    // The parent component should provide the filter method if the data are complex (like Arrays and Objects)
    // Or the column structure contains customized cells. (See the cell property of react table columns)
    // The line below will use only the considered columns ids (see disableGlobalFilter in the column definition)
    // It will filter the value of the displayed row object
    // Then add all the elements to a string separated by space
    // And an array of separate lowercase words without empty strings
    const textValues = columnIds
      .map((col: any) => values && values[col])
      .filter((v: any) => ['string', 'number'].includes(typeof v))
      .join(' ')
      .split(' ') // Delete extra spaces between words
      .filter((v: any) => v !== '')
      .join(' ')
      .toLocaleLowerCase();

    // Return whether the filter values exist in the columns or not
    // This method in the line below will do the same, however repeating the same word multiple times will meet always the condition
    const exist = arraySearchValues.every((str) => textValues.includes(str));

    // Check if there subRows that match the filter then return the parent level
    const nestedExist =
      exist ||
      (Array.isArray(row.subRows) &&
        !!DefaultGlobalFilter(row.subRows, columnIds, filterValue).length);

    // If this row matchs (not the nestedExist) the filter then add its id to filtred Ids
    if (exist && options && Array.isArray(options.filteredIds)) {
      options.filteredIds.push(row.id);
    }
    return nestedExist;
  });
};

export default DefaultGlobalFilter;
