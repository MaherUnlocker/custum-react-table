/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { TableInstance } from 'react-table';
import { createStyles, makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { DiskIcon } from '../components/assets/DiskIcon';
import { FilterChipBarCollapsible } from './FilterChipBarCollapsible';
import { IsMobileView } from './isMobileView';
import { StyledButton } from '../components/assets/StyledButton';
import { StyledIconButton } from '../components/assets/StyledIconButton';
import { StyledLabel } from '../components/assets/StyledLabel';
// import VerticalDotsIcon from '../components/assets/VerticalDotsIcon';
import { useLocalStorage } from '../utils';
import { SelectComponent } from './SelectComponent';
import { TrashIcon } from '../components/assets/TrashIcon';
// import { PencilIcon } from '../components/assets/PencilIcon';
import SuccessToast from '../components/SuccessToast';
import ErrorToast from '../components/ErrorToast';

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
}: FilterPageCustomProps<T>): React.ReactElement {
  // const { t } = useTranslation();
  const classes = useStyles({});
  const isMobile = IsMobileView();
  const {
    allColumns,
    setAllFilters,
    state: { filters },
  } = instance;

  const heightRef = React.useRef(null);
  // eslint-disable-next-line
  const [showMore, setShowMore] = React.useState(() => false);
  // eslint-disable-next-line
  const [currentHeight, setCurrentHeight] = React.useState(() => 120);

  // for adding  selected filter

  const [savedFilters, setSavedFilters] = useLocalStorage(`SavedFilters`, []);
  const [designationFilter, setDesignationFilter] = React.useState('');
  // eslint-disable-next-line
  const [oldFilterName, setOldFilterName] = React.useState('');

  const handleSaveFiltersClick = React.useCallback(() => {
    if (
      designationFilter === null ||
      designationFilter === undefined ||
      designationFilter === ''
    ) {
      ErrorToast('Merci de saisir une designation pour votre filtre');
      return;
    }
    if (filters.length === 0) {
      ErrorToast('Merci de  choisir au moins un  filtre');
      return;
    }

    if (filters.length > 0) {
      const found = savedFilters.find(
        (f: any) => f.label === designationFilter
      );

      found
        ? (savedFilters[
            savedFilters.findIndex((f: any) => f.label === designationFilter)
          ] = {
            label: designationFilter,
            value: filters,
          })
        : setSavedFilters([
            ...savedFilters,
            { label: designationFilter, value: filters },
          ]);
      found
        ? SuccessToast('Filtre modifié  avec succès')
        : SuccessToast('Filtre ajouté  avec succès');
      // found ? SuccessToast(t('Filter successfully added')) : SuccessToast(t('Filter successfully added'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designationFilter, filters, setSavedFilters, savedFilters]);

  // const handleModifyFilter = React.useCallback(() => {
  //   const found = savedFilters.find((f: any) => f.label === oldFilterName);
  //   found &&
  //     (savedFilters[savedFilters.findIndex((f: any) => f.label === oldFilterName)] = {
  //       label: oldFilterName,
  //       value: filters,
  //     });
  //   SuccessToast(t('Filter successfully updated'));
  // }, [filters, savedFilters, oldFilterName]);

  const handleSavedFiltersSelect = React.useCallback(
    (selectedValue: any) => {
      if (selectedValue) {
        setDesignationFilter(selectedValue.label);
        const indexofSelected = savedFilters.findIndex(
          (f: any) => f.label === selectedValue.label
        );
        indexofSelected > -1
          ? (function () {
              setAllFilters(savedFilters[indexofSelected].value);
              setOldFilterName(selectedValue.label);
            })()
          : setAllFilters([]);
      }
    },
    [savedFilters, setAllFilters]
  );

  function handleDeleteFilter() {
    if (
      designationFilter === null ||
      designationFilter === undefined ||
      designationFilter === ''
    ) {
      ErrorToast('Merci de selectionner un filtre pour la suppression');
      return;
    }
    const found = savedFilters.find((f: any) => f.label === designationFilter);

    if (found) {
      savedFilters.splice(
        savedFilters.findIndex((f: any) => f.label === designationFilter),
        1
      );
      setSavedFilters(savedFilters);
      setAllFilters([]);
      setDesignationFilter('');
      SuccessToast('Filtre supprimé avec succès');
    }
  }

  React.useEffect(() => {
    if (heightRef.current !== null) {
      setShowMore(document.getElementById('maher')!.offsetHeight! > 120);
      setCurrentHeight(document.getElementById('maher')!.offsetHeight!);
    }
  }, []);

  return (
    <div
      className={(classes.columnsPopOver, classes.grid, classes.cell)}
      style={{ marginLeft: 5, marginRight: 5 }}
    >
      <StyledLabel
        style={{
          borderBottom: '2px solid',
          marginLeft: 1,
          marginRight: 1,
          marginTop: 10,
        }}
      >
        Filtres enregistrés
        {/* {t('Saved filters')} */}
      </StyledLabel>
      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div style={{ width: ' 100%', marginTop: 10 }}>
          <StyledLabel htmlFor="savedFilter">
            {/* {t('Select a filter')} */}
            Sélectionner un filtre
          </StyledLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '10fr 1fr',
              alignItems: 'center',
            }}
          >
            <SelectComponent
              options={savedFilters.length > 0 ? savedFilters : []}
              setDesignationFilter={setDesignationFilter}
              handleSavedFiltersSelect={handleSavedFiltersSelect}
              designationFilter={designationFilter}
              setAllFilters={setAllFilters}
            />
            <Box component="div" sx={{ display: 'flex', alignItems: 'end' }}>
              <StyledIconButton
                icon="DiskIcon"
                style={{
                  margin: '0px 5px',

                  border: '1px solid',
                  borderRadius: '6px',
                }}
                onClick={handleSaveFiltersClick}
              >
                <DiskIcon height={20} width={20} />
              </StyledIconButton>
              <StyledIconButton
                icon="DiskIcon"
                style={{
                  margin: '0px 5px',

                  border: '1px solid',
                  borderRadius: '6px',
                }}
                onClick={handleDeleteFilter}
              >
                <TrashIcon
                  style={{ cursor: 'pointer' }}
                  height={20}
                  width={20}
                  className="mx-2"
                />
              </StyledIconButton>

              {/* <StyledIconButton
                icon='VerticalDotsIcon'
                style={{
                  margin: '0px 5px',
                  border: '1px solid',
                  borderRadius: '6px',
                }}
              >
                <VerticalDotsIcon
                  height={20}
                  width={20}
                  className='dropdown'
                  id='filteraction'
                  data-bs-toggle='dropdown'
                />
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <div className='dropdown-item d-flex align-items-center' onClick={() => handleModifyFilter()}>
                    <PencilIcon
                      className='mx-2'
                      style={{ cursor: 'pointer' }}
                      height={20}
                      width={20}
                      onClick={() => {}}
                    />
                    {t('Modify')}
                  </div>
                  <div className='dropdown-item d-flex align-items-center' onClick={handleDeleteFilter}>
                    <TrashIcon
                      style={{ cursor: 'pointer' }}
                      height={20}
                      width={20}
                      onClick={() => {}}
                      className='mx-2'
                    />
                    {t('Delete')}
                  </div>
                </div>
              </StyledIconButton> */}
            </Box>
          </div>
        </div>
      </Box>
      <StyledLabel
        style={{
          borderBottom: '2px solid',
          marginLeft: 1,
          marginRight: 1,
          marginTop: 10,
        }}
      >
        Filtrer
        {/* {t('Filter')} */}
      </StyledLabel>
      {Object.keys(instance.state.filters).length > 0 ? (
        <Box id="maher" component="div" ref={heightRef}>
          <FilterChipBarCollapsible
            instance={instance}
            showMore={showMore}
            currentHeight={currentHeight}
          />
        </Box>
      ) : (
        <StyledButton rounded variant="light" style={{ width: '100%' }}>
          Aucun filtre actif
          {/* {t('No active filter')} */}
        </StyledButton>
      )}
      <Box
        component="div"
        id="listfilter"
        style={{
          maxHeight: !isMobile ? 'calc(100vh - 350px)' : 'auto',
          overflow: 'auto',
          alignItems: 'center',
        }}
      >
        {allColumns
          .filter(
            (it) =>
              it.canFilter &&
              it.isVisible &&
              it.id !== 'delete' &&
              it.id !== '_Actions' &&
              it.id !== 'expander' &&
              it.id !== 'hidecolumns'
          )
          .map((column) => (
            <div
              key={column.id}
              className="my-2"
              // sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              {column.render('Filter')}
            </div>
          ))}
      </Box>
    </div>
  );
}
