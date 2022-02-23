import { CrossIcon, DiskIcon, RefreshIcon, StyledButton, StyledIconButton } from '@aureskonnect/react-ui';
import { Box, Popover } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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

type FilterPageCustomProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose?: () => void;
  show?: boolean;
  setLocalFilterActive: any;
  filterActive?: boolean;
};

export function FilterPageCustom<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
  filterActive,
  setLocalFilterActive,
}: FilterPageCustomProps<T>): ReactElement {
  const classes = useStyles({});
  const { allColumns, setAllFilters, rows, prepareRow } = instance;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // onClose();
    },
    [onClose]
  );

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  return (
    <div className={(classes.columnsPopOver, classes.grid, classes.cell)}>
      <form onSubmit={onSubmit} className={classes.cell}>
        <Box component='div' sx={{ borderBottom: '1px solid', marginX: 1, marginY: 2 }}>
          Filtrer
        </Box>

        <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <StyledButton rounded variant='info' style={{ margin: '5px' }}>
            Appliquer
          </StyledButton>
          <StyledIconButton icon='DiskIcon' style={{ margin: '5px', border: '1px solid' }}>
            <DiskIcon height={20} width={20} />
          </StyledIconButton>
          <StyledIconButton onClick={resetFilters} icon='RefreshIcon' style={{ margin: '5px', border: '1px solid' }}>
            <RefreshIcon height={20} width={20} />
          </StyledIconButton>
        </Box>

        <Box
          component='div'
          style={{ height: '60vh', overflow: 'auto', alignItems: 'center' }}
          sx={{ marginLeft: 1, marginRight: 1 }}
        >
          {allColumns
            .filter((it) => it.canFilter && it.id !== 'delete' && it.isVisible)
            .map((column) => {
              return (
                <div
                  className='my-2'
                  // sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  {column.render('Filter')}
                </div>
              );
            })}
        </Box>
      </form>
    
    </div>
  );
}
