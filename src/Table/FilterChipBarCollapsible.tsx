import { Chip, Collapse } from '@mui/material';
import { ColumnInstance, FilterValue, IdType, TableInstance } from 'react-table';
import React, { ReactElement, useCallback } from 'react';
import { createStyles, makeStyles } from '@mui/styles';

import { CrossIcon } from '@aureskonnect/react-ui';

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
  showMore: boolean;
  currentHeight: number;
};

const getFilterValue = (column: ColumnInstance<any>, filterValue: FilterValue) => {
  switch (column.filter) {
    case 'between':
      const min = filterValue[0];
      const max = filterValue[1];
      return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`;
  }
  return filterValue;
};

export function FilterChipBarCollapsible<T extends Record<string, unknown>>({
  instance,
  showMore,
}: FilterChipBarProps<T>): ReactElement | null {
  const classes = useStyles({});
  const {
    allColumns,
    setFilter,
    setAllFilters,
    state: { filters },
  } = instance;

  const handleDelete = useCallback(
    (id: string | number) => {
      setFilter(id as IdType<T>, undefined);
    },
    [setFilter]
  );

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function FilteredChipBar({ splicedFilter, showMore }: { splicedFilter: boolean; showMore: boolean }) {
    const [filtersToShow, setFiltersToShow] = React.useState(() => filters);

    React.useEffect(() => {
      if (showMore) {
        setFiltersToShow(splicedFilter ? filters.slice(2, filters.length) : filters.slice(0, 2));
      }
    }, [showMore, splicedFilter]);

    return (
      <React.Fragment>
        {allColumns.map((column: ColumnInstance<T>) => {
          const filter = filtersToShow.find((f) => f.id === column.id);

          const value = filter && filter.value;
          return (
            value && (
              <Chip
                className={classes.filterChip}
                key={column.id}
                deleteIcon={<CrossIcon height={10} width={10} fill='#2B2828' />}
                label={
                  <React.Fragment>
                    <span className={classes.chipLabel}>{column.render('Header')}: </span>
                    <span className={classes.chipLabel}>{getFilterValue(column, value)} </span>
                  </React.Fragment>
                }
                onDelete={() => handleDelete(column.id)}
                variant='outlined'
              />
            )
          );
        })}
      </React.Fragment>
    );
  }

  return Object.keys(filters).length > 0 ? (
    <div className={classes.chipZone}>
      <span
        className={classes.filtersActiveLabel}
        style={{ color: '#FF0000', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
        onClick={() => resetFilters()}
      >
        Effacer tous
      </span>
      {filters.length > 0 ? <FilteredChipBar splicedFilter={false} showMore={showMore} /> : null}

      <Collapse in={expanded}>
        {filters.length > 2 ? <FilteredChipBar splicedFilter={true} showMore={showMore} /> : null}
      </Collapse>
      {showMore ? (
        <span
          onClick={() => handleExpandClick()}
          style={{
            textAlign: 'end',
            color: '#0077D7',
            textDecoration: 'underline',
            cursor: 'pointer',
            alignItems: 'flex-end',
            display: 'block',
            marginRight: '11px',
          }}
        >
          {expanded ? 'Afficher moins' : 'Afficher plus'}
        </span>
      ) : null}
    </div>
  ) : null;
}
