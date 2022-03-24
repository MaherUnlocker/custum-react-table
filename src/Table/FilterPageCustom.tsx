import {
  DiskIcon,
  StyledButton,
  StyledIconButton,
  StyledLabel,
  StyledSelectInput,
  VerticalDotsIcon,
} from '@aureskonnect/react-ui';
import React, { ReactElement, useCallback, useRef } from 'react';
import { createStyles, makeStyles } from '@mui/styles';

import { Box } from '@mui/material';
import { FilterChipBarCollapsible } from './FilterChipBarCollapsible';
import { IsMobileView } from './isMobileView';
import { TableInstance } from 'react-table';
import { useLocalStorage } from '../utils';

const useStyles = makeStyles(
  createStyles({
    columnsPopOver: {
      padding: 24,
      display: 'flex',
    },
    FiltersCss: {
      border: '1px solid rgba(224, 224, 224, 1)',
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
  onClose,
  filterActive,
  setLocalFilterActive,
}: FilterPageCustomProps<T>): ReactElement {
  const classes = useStyles({});
  const {
    allColumns,
    setAllFilters,
    state: { filters },
  } = instance;
  const heightRef = useRef(null);
  // eslint-disable-next-line
  const [showMore, setShowMore] = React.useState(() => false);
  // eslint-disable-next-line
  const [currentHeight, setCurrentHeight] = React.useState(() => 120);

  // for adding  selected filter

  const [savedFilters, setSavedFilters] = useLocalStorage(`SavedFilters`, []);
  const [designationFilter, setDesignationFilter] = React.useState('');

  React.useEffect(() => {
    if (heightRef.current !== null) {
      setShowMore(document.getElementById('maher')!.offsetHeight! > 120);
      setCurrentHeight(document.getElementById('maher')!.offsetHeight!);
    }
  }, []);
  const handleSavedFiltersClick = useCallback(() => {
    const found = savedFilters.find((f: any) => f.label === designationFilter);
    if (found) {
      savedFilters[savedFilters.findIndex((f: any) => f.label === designationFilter)] = {
        label: designationFilter,
        value: filters,
      };
    } else {
      setSavedFilters([...savedFilters, { label: designationFilter, value: filters }]);
    }
  }, [designationFilter, filters, setSavedFilters, savedFilters]);

  const handleSavedFiltersSelect = useCallback(
    (selectedValue: any) => {
      setDesignationFilter(selectedValue.label);
      const indexofSelected = savedFilters.findIndex((f: any) => f.label === selectedValue.label);
      if (indexofSelected) {
        setAllFilters(savedFilters[indexofSelected].value);
      }
    },
    [savedFilters, setAllFilters]
  );
  const isMobile = IsMobileView();
  return (
    <div className={(classes.columnsPopOver, classes.grid, classes.cell)} style={{ marginLeft: 5, marginRight: 5 }}>
      <StyledLabel style={{ borderBottom: '2px solid', marginLeft: 1, marginRight: 1, marginTop: 10 }}>
        Filtres enregistrés
      </StyledLabel>

      <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: ' 100%', marginTop: 10 }}>
          <StyledLabel htmlFor='savedFilter'>Sélectionner un filtre</StyledLabel>
          <StyledSelectInput
            onInputChange={(e: string) => {
              if (e !== '') setDesignationFilter(e);
            }}
            inputValue={designationFilter}
            id='savedFilter'
            name='savedFilter'
            options={savedFilters.length > 0 ? savedFilters : []}
            placeholder={savedFilters.length > 0 ? 'Sélectionner ...' : 'Aucune'}
            onChange={handleSavedFiltersSelect}
            allowCreateWhileLoading
          />
        </div>

        <Box component='div' sx={{ display: 'flex', alignItems: 'end' }}>
          <StyledIconButton
            icon='DiskIcon'
            style={{ margin: '5px', marginBottom: '0', border: '1px solid', borderRadius: '6px' }}
            onClick={handleSavedFiltersClick}
          >
            <DiskIcon height={20} width={20} />
          </StyledIconButton>

          <StyledIconButton
            icon='VerticalDotsIcon'
            style={{ margin: '5px', marginBottom: '0', border: '1px solid', borderRadius: '6px' }}
          >
            <VerticalDotsIcon height={20} width={20} />
          </StyledIconButton>
        </Box>
      </Box>

      <StyledLabel style={{ borderBottom: '2px solid', marginLeft: 1, marginRight: 1, marginTop: 10 }}>
        Filtrer
      </StyledLabel>

      {Object.keys(instance.state.filters).length > 0 ? (
        <Box id='maher' component='div' ref={heightRef}>
          <FilterChipBarCollapsible instance={instance} showMore={showMore} currentHeight={currentHeight} />
        </Box>
      ) : (
        <StyledButton rounded variant='light' style={{ width: '100%' }}>
          Aucun filtre actif
        </StyledButton>
      )}

      <Box component='div' style={{ maxHeight: !isMobile ? '50vh' : 'auto', overflow: 'auto', alignItems: 'center' }}>
        {allColumns
          .filter(
            (it) =>
              it.canFilter &&
              it.isVisible &&
              it.id !== 'delete' &&
              it.id !== 'Actions' &&
              it.id !== 'expander' &&
              it.id !== 'hidecolumns'
          )
          .map((column) => (
            <div
              key={column.id}
              className='my-2'
              // sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              {column.render('Filter')}
            </div>
          ))}
      </Box>
    </div>
  );
}
