import React from 'react';

import {
  ColumnInstance,
  FilterValue,
  IdType,
  TableInstance,
} from 'react-table';
import { createStyles, makeStyles } from '@mui/styles';
// import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';

import { CrossIcon } from '../components/assets/CrossIcon';

const useStyles = makeStyles(
  createStyles({
    filtersActiveLabel: {
      color: '#2B2828',
      fontSize: '14px',
      paddingRight: 10,
    },
    chipZone: {
      padding: '18px 0 5px 10px',
      width: '100%',
    },
    chipLabel: {
      fontWeight: 500,
      marginRight: 5,
      color: '#2B2828 !important',
    },
    filterChip: {
      border: '1px solid #626368 !important',
      background: '#F6F6F6 0% 0% no-repeat padding-box !important',
      marginRight: '5px!important',
      marginBottom: '5px!important',
    },
  })
);

type FilterChipBarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

// between filter to be used in next level inchallah
// const getFilterValue = (column: ColumnInstance<any>, filterValue: FilterValue) => {
//   switch (column.filter) {
//     case 'between':
//       const min = filterValue[0];
//       const max = filterValue[1];
//       return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`;
//   }
//   return filterValue;
// };

export function FilterChipBar<T extends Record<string, unknown>>({
  instance,
}: FilterChipBarProps<T>): React.ReactElement | null {
  // const { t } = useTranslation();
  const [renderFilters, setRenderFilters] = React.useState(false);
  const classes = useStyles({});
  const {
    allColumns,
    setFilter,
    setAllFilters,
    state: { filters },
  } = instance;

  const handleDelete = React.useCallback(
    (id: string | number, selectedFilterValue: string | number) => {
      const filtered = filters.find((f) => f.id === id);
      const newValues =
        filtered !== undefined &&
        filtered?.value.filter((f: any) => f !== selectedFilterValue);
      setFilter(id as IdType<T>, newValues?.length > 0 ? newValues : []);
    },
    [setFilter, filters]
  );

  const resetFilters = React.useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);
  React.useEffect(() => {
    setRenderFilters(
      filters.some((filterValue: any) => filterValue.value.length > 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return renderFilters ? (
    <div className={classes.chipZone}>
      <span
        className={classes.filtersActiveLabel}
        style={{
          color: '#FF0000',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => resetFilters()}
      >
        Effacer tous
      </span>
      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id);

          const values = filter && filter.value;

          return (
            values &&
            values.map((Filtervalue: any) => (
              <Chip
                className={classes.filterChip}
                key={Filtervalue}
                deleteIcon={<CrossIcon height={10} width={10} fill="#2B2828" />}
                label={
                  <React.Fragment>
                    <span className={classes.chipLabel}>
                      {column.render('Header')}:{' '}
                    </span>
                    <span className={classes.chipLabel}>{Filtervalue} </span>
                  </React.Fragment>
                }
                onDelete={() => handleDelete(column.id, Filtervalue)}
                // onDelete={() => handleDelete(column.id, Filtervalue)}
                variant="outlined"
              />
            ))
          );
        })}
    </div>
  ) : null;
}
