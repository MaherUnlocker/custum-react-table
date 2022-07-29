import React from 'react';

import { useManyClickHandlers } from './useManyClickHandlers';
import { TableDispatch } from 'react-table';
import { RowCheckbox } from '../Table/TableStyle';

type ControlledCheckboxPropsType = {
  isHeader: boolean;
  row: any;
  //dispatchSelectedRows: any;
  dispatchSelectedRows: TableDispatch<any>;
  selectedRows: any[];
  selectedFlatRows: any[];
  isAllRowsSelected: boolean;
  toggleAllRowsSelected?: any;
};

export default function ControlledCheckbox({
  isHeader,
  row,
  dispatchSelectedRows,
  selectedRows,
  selectedFlatRows,
  isAllRowsSelected,
  toggleAllRowsSelected,
}: ControlledCheckboxPropsType): JSX.Element {
  const [checked, setChecked] = React.useState<boolean>(false);
  const handleClickHeader = () => {
    toggleAllRowsSelected();
    isAllRowsSelected
      ? dispatchSelectedRows({
          type: 'customUnSelectAll',
          payload: selectedFlatRows,
        })
      : dispatchSelectedRows({
          type: 'customSelectAll',
          payload: selectedFlatRows,
        });
  };
  const handleClickRow = () => {
    selectedRows?.filter((elm: any) => elm.id === row.id).length > 0
      ? dispatchSelectedRows({
          type: 'customUnSelectRow',
          payload: row.id,
        })
      : dispatchSelectedRows({ type: 'customSelectRow', payload: row });
  };

  const singleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    isHeader ? handleClickHeader() : handleClickRow();
    setChecked(!checked);
  };

  const doubleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    setChecked(!checked);
  };

  const clickHandler = useManyClickHandlers(
    singleClickHandler,
    doubleClickHandler
  );

  React.useEffect(() => {
    setChecked(
      isAllRowsSelected
        ? isAllRowsSelected
        : row !== undefined &&
            selectedRows?.filter((elm: any) => elm.id === row.id).length > 0
    );
  }, [isAllRowsSelected, row, selectedRows]);

  return (
    <RowCheckbox
      onClick={clickHandler}
      checked={checked}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    // <Checkbox
    //   onClick={clickHandler}
    //   checked={checked}
    //   inputProps={{ 'aria-label': 'controlled' }}
    //   // style={{ marginLeft: `${row?.depth * 2}rem` }}
    // />
  );
}
