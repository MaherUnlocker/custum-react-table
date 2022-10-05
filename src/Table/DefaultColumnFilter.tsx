import React from 'react';

import _uniqby from 'lodash.uniqby';
// import { useTranslation } from 'react-i18next';
import { FilterProps, IdType } from 'react-table';

import { findFirstColumn } from './Table';
import { StyledLabel } from '../components/assets/StyledLabel';
import { StyledSelectInput } from '../components/assets/StyledSelectInput';
import NoOptionsMessage from './NoOptionsMessage';

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
  setFilter,
}: FilterProps<T>): React.ReactElement {
  // const { t } = useTranslation();
  const { filterValue, render, preFilteredRows, id } = column;
  const [, setValue] = React.useState(filterValue || '');

  const listOptions = React.useMemo(() => {
    const options = new Set();

    preFilteredRows.forEach((row: any) => {
      row.values[id] !== undefined &&
        row.values[id] !== '' &&
        row.values[id] !== null &&
        options.add({ value: row.values[id], label: row.values[id] });
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // his uniquby from lodash for get unique array of object
  const unique: any = _uniqby(listOptions, 'label'); //using lodash function to filter and get unique opjects

  // this uniquby from lodash for get unique array of object
  // FilterArray = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects
  // let unique: any = [...new Set(_without(FilterArray, undefined, null, 'null', 'undefined'))]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);

  const isFirstColumn = findFirstColumn(columns) === column;
  const [selecteFiltersColumn, setSelectedValueState] = React.useState<any[]>(
    []
  );

  function handleSelectOnChangeEvent(selectedOption: any, action: any) {
    //setFilter((prevState: any) => selectedOption.map((elm: any) => elm.value));
    setFilter(
      id as IdType<T>,
      selectedOption.length > 0
        ? selectedOption.map((elm: any) => elm.value)
        : []
    );
    setSelectedValueState(selectedOption);
  }
  // ensure that reset loads the new value
  React.useEffect(() => {
    setValue(filterValue || '');
    setSelectedValueState((prev: any[]) => {
      let newState = [];
      if (filterValue && filterValue.length > 0) {
        newState = filterValue.map((elm: any) => ({ label: elm, value: elm }));
      }
      return newState;
    });
  }, [filterValue]);

  return (
    <React.Fragment>
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        menuPlacement="auto"
        menuPosition="fixed"
        isMulti
        closeMenuOnSelect={false}
        value={selecteFiltersColumn}
        id={column.id}
        name={column.id}
        options={unique}
        placeholder={listOptions.length > 0 ? 'Sélectionner...' : 'Aucune'}
        onChange={handleSelectOnChangeEvent}
        // onInputChange={handleSelectOnChangeEvent}
        autoFocus={isFirstColumn}
        components={{ NoOptionsMessage }}
        menuShouldBlockScroll
      />
    </React.Fragment>
  );
}
