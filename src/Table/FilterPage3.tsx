import { Checkbox, FormControlLabel, Popover } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FormEvent, ReactElement, useCallback } from 'react';
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

type FilterPopupProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

export function FilterPopup<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: FilterPopupProps<T>): ReactElement {
  const classes = useStyles({});
  const { allColumns, setAllFilters, toggleHideColumn } = instance;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  function FilterFormControl({ visibleColumns }: { visibleColumns: any[] }) {
    const [columns, setColumns] = React.useState<any[]>(visibleColumns);

    return (
      <React.Fragment>
        {columns.map((column) => (
          <FormControlLabel
            key={column.id}
            control={<Checkbox value={column.id} disabled={column.isVisible} />}
            label={column.id}
            checked={true}
            onChange={() => {
              setColumns(columns.filter((cl) => cl.id === column.id));
            }}
          />
        ))}
      </React.Fragment>
    );
  }

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
        <FilterFormControl
          visibleColumns={allColumns.filter(
            (it) => it.canFilter && it.isVisible
          )}
        />
      </div>
    </Popover>
  );
}
