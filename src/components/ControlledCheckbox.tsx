import React from 'react';

import { useManyClickHandlers } from './useManyClickHandlers';
import { RowCheckbox } from '../Table/TableStyle';
import { getNestedId } from '../utils/getNestedId';
import { filterByReference } from '../utils';

import { ControlledCheckboxPropsType } from '../../types/react-table-config';

export default function ControlledCheckbox({
  isHeader,
  row,
  dispatchSelectedRows,
  selectedRows,
  allRows,
  selectedFlatRows,
  isAllRowsSelected,
  toggleAllRowsSelected,
  indeterminate,
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
  const handleSingleClick = () => {
    selectedRows?.filter((elm: any) => elm.id === row.id).length > 0
      ? dispatchSelectedRows({
          type: 'customUnSelectRow',
          payload: row.id,
        })
      : dispatchSelectedRows({ type: 'customSelectRow', payload: row });
  };

  const handleDoubleClick = () => {
    const nestedRowsId = getNestedId((x: any) => x.id)(row);

    if (selectedRows?.filter((elm: any) => elm.id === row.id).length > 0) {
      dispatchSelectedRows({
        type: 'unSelectedNestedRows',
        payload: nestedRowsId,
      });
    } else {
      const RowsSelected = filterByReference(allRows, nestedRowsId, true);

      dispatchSelectedRows({
        type: 'selectedNestedRows',
        payload: [...RowsSelected],
      });
    }
  };

  const singleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    isHeader ? handleClickHeader() : handleSingleClick();
    setChecked(!checked);
  };

  const doubleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    !isHeader && handleDoubleClick();
    setChecked(!checked);
  };

  const clickHandler = useManyClickHandlers(
    singleClickHandler,
    doubleClickHandler
  );

  React.useEffect(() => {
    isHeader
      ? setChecked(
          isAllRowsSelected ||
            (allRows &&
              allRows?.length > 0 &&
              allRows?.length === selectedRows?.length)
            ? true
            : false
        )
      : setChecked(
          isAllRowsSelected
            ? true
            : row !== undefined &&
                selectedRows?.filter((elm: any) => elm.id === row.id).length > 0
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllRowsSelected, row, selectedRows]);

  return (
    <RowCheckbox
      onClick={clickHandler}
      checked={checked}
      title={
        row?.subRows?.length > 0
          ? `Double-cliquer pour sélectionner l'élément et ses sous-éléments`
          : 'sélectionner/Désélectionner'
      }
      style={{
        paddingLeft: row?.depth === 0 ? '9px' : `${row?.depth * 1.5}rem`,
      }}
      indeterminate={indeterminate}
    />
  );
}
