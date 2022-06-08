import React from 'react';
import _uniqby from 'lodash.uniqby';
import { findFirstColumn } from './Table';
import { StyledLabel } from '../components/assets/StyledLabel';
import { StyledSelectInput } from '../components/assets/StyledSelectInput';
import { FilterProps } from 'react-table';

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
  rows,
  prepareRow,
}: FilterProps<T>): React.ReactElement {
  const { filterValue, setFilter, render } = column;
  const [, setValue] = React.useState(filterValue || '');

  // ensure that reset loads the new value
  React.useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  const FilterArray: any[] = rows.map((row: any) => {
    prepareRow(row);
    return (
      row.cells
        .filter((cel: any) => {
          const { key: cellKey } = cel.getCellProps();
          // eslint-disable-next-line
          return (
            (cellKey as string).replace(/([^\_]*\_){2}/, '') ===
            (column.id as string)
          );
        })
        // eslint-disable-next-line
        .map((cell: any) => {
          return { label: String(cell.value), value: String(cell.value) };
        })[0]
    );
  });

  // his uniquby from lodash for get unique array of object
  const unique: any = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects

  // this uniquby from lodash for get unique array of object
  // FilterArray = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects
  // let unique: any = [...new Set(_without(FilterArray, undefined, null, 'null', 'undefined'))]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);

  const isFirstColumn = findFirstColumn(columns) === column;
  const [, setSelectedValueState] = React.useState<any[]>([]);

  function handleSelectOnChangeEvent(selectedValue: any) {
    console.log(
      '🚀 ~ file: Table.tsx ~ line 120 ~ handleSelectOnChangeEvent ~ selectedValue',
      selectedValue
    );
    setSelectedValueState(selectedValue);
    //  add selected filter
    setFilter(selectedValue.value);
  }

  return (
    <React.Fragment>
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        menuPlacement="auto"
        menuPosition="fixed"
        id={column.id}
        name={column.id}
        options={unique}
        placeholder="Sélectionner ..."
        onChange={handleSelectOnChangeEvent}
        // onInputChange={handleSelectOnChangeEvent}
        autoFocus={isFirstColumn}
      />
    </React.Fragment>
  );
}