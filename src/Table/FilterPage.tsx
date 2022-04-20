import { createStyles, makeStyles } from '@mui/styles';

import { Popover } from '@mui/material';
import React from 'react';
import { TableInstance } from 'react-table';

const useStyles = makeStyles(
  createStyles({
    columnsPopOver: {
      padding: 24,
      display: 'flex',
    },
    filtersResetButton: {
      position: 'absolute',
      top: 18,
      right: 21,
    },
    popoverTitle: {
      fontWeight: 500,
      padding: '0 24px 24px 0',
      textTransform: 'uppercase',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 218px)',
      '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 180px)',
      },
      gridColumnGap: 24,
      gridRowGap: 24,
    },
    cell: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    hidden: {
      display: 'none',
    },
  })
);
type FilterPageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

export function FilterPage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: FilterPageProps<T>): React.ReactElement {
  const classes = useStyles({});
  const { allColumns, setAllFilters } = instance;

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  // const resetFilters = React.useCallback(() => {
  //   setAllFilters([]);
  // }, [setAllFilters]);

  return (
    <Popover
      anchorEl={anchorEl}
      id={'popover-filters'}
      onClose={onClose}
      open={show}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={(classes.columnsPopOver, classes.grid, classes.cell)}>
        <form onSubmit={onSubmit} className={classes.cell}>
          {/* <button onClick={resetFilters}>Reset</button> */}
          <div>
            {allColumns

              .filter((it) => it.canFilter)
              .map((column) => (
                <div key={column.id} className="d-flex mt-2">
                  {column.render('Filter')}
                </div>
              ))}
          </div>
        </form>
      </div>
    </Popover>
  );
}
