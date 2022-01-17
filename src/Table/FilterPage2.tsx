import { Popover } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FormEvent, ReactElement, useCallback } from 'react';
import { TableInstance } from 'react-table';

type FilterPageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;

  onClose: () => void;
};

export function FilterPage<T extends Record<string, unknown>>({
  instance,

  onClose,
}: FilterPageProps<T>): ReactElement {
  // const classes = useStyles({});
  const { setFilter, allColumns, setAllFilters } = instance;

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {allColumns
          .filter((it) => it.canFilter && it.isVisible)
          .map((column) => (
            <div key={column.id} className="d-flex px-2">
              {console.log({ cc: column.id })}
              {column.render('Filter')}
            </div>
          ))}
      </div>
    </div>
  );
}
