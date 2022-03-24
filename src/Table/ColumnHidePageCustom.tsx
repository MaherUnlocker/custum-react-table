import React, { ReactElement } from 'react';

import { Divider } from '@mui/material';
import { TableInstance } from 'react-table';
import { useStyles } from './TableStyle';

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

export function ColumnHidePageCustom<T extends Record<string, unknown>>({
  instance,
}: ColumnHidePageProps<T>): ReactElement | null {
  const classes = useStyles();
  const [isVisible, setIsVisible] = React.useState(false);
  const { allColumns, toggleHideAllColumns, toggleHideColumn } = instance;
  const hideableColumns = allColumns.filter(
    (column) => !(column.id === '_selector') && !(column.id === 'expander') && !(column.id === 'hidecolumns')
  );

  const uncheckedCount = hideableColumns.reduce((acc, val) => acc + (val.isVisible ? 0 : 1), 0);
  const onlyOneOptionLeft = uncheckedCount + 1 >= hideableColumns.length;
  // eslint-disable-next-line
  function toggleAllColumnsVisibility() {
    if (uncheckedCount === 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  return hideableColumns.length > 1 ? (
    <div className='d-flex flex-column'>
      <div key='showall' className='   mx-2 d-flex align-items-center justify-content-between'>
        <label
          style={{
            font: 'normal normal normal 13px/17px Segoe UI',
            letterSpacing: '0px',
            color: '#495057 ',
          }}
        >
          Afficher tous:
        </label>
        <input
          type='checkbox'
          checked={isVisible}
          onChange={() => {
            toggleHideAllColumns(false);
            setIsVisible(true);
          }}
        />
      </div>
      <Divider className={classes.DividerCss} />

      {hideableColumns.map((column: any) => (
        <div key={column.id} className='  my-1 mx-2 d-flex align-items-center justify-content-between'>
          <label
            style={{
              font: 'normal normal normal 13px/17px Segoe UI',
              letterSpacing: '0px',
              color: '#495057 ',
            }}
          >
            {column.id}
          </label>
          <input
            type='checkbox'
            // {...column.getToggleHiddenProps()}
            onChange={() => {
              toggleHideColumn(column.id, column.isVisible);
              setIsVisible(uncheckedCount === 0 ? true : false);
            }}
            disabled={column.isVisible && onlyOneOptionLeft}
            checked={column.isVisible}
          />
        </div>
      ))}
    </div>
  ) : null;
}
