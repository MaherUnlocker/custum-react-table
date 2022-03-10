import { Checkbox, FormControlLabel, Popover } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { ReactElement } from 'react';
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

type ShowHideFilterProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

export function ShowHideFilterPage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
}: ShowHideFilterProps<T>): ReactElement | null {
  const classes = useStyles({});
  const { allColumns, toggleHideColumn } = instance;
  const hideableColumns = allColumns.filter(
    (column) => !(column.id === '_selector') && !(column.id === 'expander') && !(column.id === 'hidecolumns')
  );
  const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.isVisible ? 0 : 1), 0);

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;
  function FilterFormControl({ visibleColumns }: { visibleColumns: any[] }) {
    const [columns, setColumns] = React.useState<any[]>(
      visibleColumns.map((element) => {
        return {
          ...element,
          active: false,
        };
      })
    );

    return (
      <React.Fragment>
        {columns.map((column) => (
          <FormControlLabel
            key={column.id}
            control={<Checkbox value={column.id} />}
            label={column.id}
            checked={column.active}
            onChange={() => {
              column.active = !column.active;
              !column.active
                ? (document.getElementsByName(column.id)[0].style.display = 'none')
                : (document.getElementsByName(column.id)[0].style.display = '');
              setColumns((prevState: typeof columns) => {
                let index = prevState.indexOf(column);
                let newState = [...prevState];
                newState[index] = column;
                return newState;
              });
            }}
          />
        ))}
      </React.Fragment>
    );
  }
  return hideableColumns.length > 1 ? (
    <div>
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
        style={{ padding: 24 }}
      >
        <div className={(classes.columnsPopOver, classes.grid, classes.cell)}>
          <div style={{ display: 'grid' }}>
            <FilterFormControl visibleColumns={allColumns.filter((it) => it.canFilter && it.isVisible)} />
          </div>
        </div>
      </Popover>
    </div>
  ) : null;
}
