import React from 'react';

import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { Box, Grid, TableContainer, TableSortLabel, Tooltip } from '@mui/material';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import _uniqby from 'lodash.uniqby';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  Cell,
  CellProps,
  ColumnInstance,
  FilterProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import {
  HeaderCheckbox,
  RawTable,
  RowCheckbox,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableLabel,
  TableRow,
  useStyles,
} from './TableStyle';
import { camelToWords, useDebounce, useLocalStorage } from '../utils';
import { fuzzyTextFilter, numericTextFilter } from './filters';
import ChoiceIcon from './Choice';
import CollapsibleTable from './CollapsibleTable';
import { ColumnHidePageCustom } from './ColumnHidePageCustom';
import { CrossIcon } from '../components/assets/CrossIcon';
import DefaultGlobalFilter from './filters/defaultGlobalFilter';
import { DynamicTableProps } from './DynamicTable';
import { FilterChipBar } from './FilterChipBar';
import { FilterIcon } from '../components/assets/FilterIcon';
import FilterModalMobile from './FilterModalMobile';
import { FilterPageCustom } from './FilterPageCustom';
import { IsMobileView } from './isMobileView';
import { ResizeHandle } from './ResizeHandle';
import { StyledH2 } from '../components/assets/StyledH2';
import { StyledLabel } from '../components/assets/StyledLabel';
import { StyledSelectInput } from '../components/assets/StyledSelectInput';
import SvgNoData from '../components/assets/SvgNoData';
import { TablePagination } from './TablePagination';
import { TableToolbar } from './TableToolbar';
import { TooltipCellRenderer } from './TooltipCell';

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T>, DynamicTableProps {
  onAdd?: (instance: TableInstance<T>) => React.MouseEventHandler;
  onDelete?: (instance: TableInstance<T>) => React.MouseEventHandler;
  onEdit?: (instance: TableInstance<T>) => React.MouseEventHandler;
  onClick?: (row: Row<T>) => void;
}

function DefaultHeader({ column }: HeaderProps<any>) {
  return <>{column.id.startsWith('_') ? null : camelToWords(column.id)}</>;
}

// yes this is recursive, but the depth never exceeds three so it seems safe enough
const findFirstColumn = <T extends Record<string, unknown>>(columns: Array<ColumnInstance<T>>): ColumnInstance<T> =>
  columns[0].columns ? findFirstColumn(columns[0].columns) : columns[0];

function DefaultColumnFilter<T extends Record<string, unknown>>({ columns, column, rows, prepareRow }: FilterProps<T>) {
  const { filterValue, setFilter, render } = column;
  const [, setValue] = React.useState(filterValue || '');

  // ensure that reset loads the new value
  React.useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  const FilterArray: any[] = rows.map((row) => {
    prepareRow(row);
    return (
      row.cells
        .filter((cel: any) => {
          const { key: cellKey } = cel.getCellProps();
          // eslint-disable-next-line
          return (cellKey as string).replace(/([^\_]*\_){2}/, '') === (column.id as string);
        })
        // eslint-disable-next-line
        .map((cell: any) => {
          return { label: String(cell.value), value: String(cell.value) };
        })[0]
    );
  });

  // his uniquby from lodash for get unique array of object
  const unique: any = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects

  // this uniquby from lodash for get unique array of object
  // FilterArray = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects
  // let unique: any = [...new Set(_without(FilterArray, undefined, null, 'null', 'undefined'))]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);

  const isFirstColumn = findFirstColumn(columns) === column;
  const [, setSelectedValueState] = React.useState<any[]>([]);

  function handleSelectOnChangeEvent(selectedValue: any) {
    setSelectedValueState(selectedValue);
    //  add selected filter
    setFilter(selectedValue.value);
  }

  return (
    <React.Fragment>
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        id={column.id}
        name={column.id}
        options={unique}
        placeholder='Sélectionner ...'
        onChange={handleSelectOnChangeEvent}
        autoFocus={isFirstColumn}
      />
    </React.Fragment>
  );
}

const getStyles = (props: any, disableResizing = false, align = 'left') => [
  props,
  {
    style: {
      justifyContent: 'start',
      alignItems: 'center',
      display: 'flex',
    },
  },
];

const cellProps = <T extends Record<string, unknown>>(props: any, { cell }: Meta<T, { cell: Cell<T> }>) =>
  getStyles(props, cell.column && cell.column.disableResizing, cell.column && cell.column.align);

const defaultColumn = {
  Filter: DefaultColumnFilter,
  Cell: TooltipCellRenderer,
  Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 10, // minWidth is only used as a limit for resizing
  // width: 150, // width is used for both the flex-basis and flex-grow
  maxWidth: 200, // maxWidth is only used as a limit for resizing
};

const filterTypes: any = {
  fuzzyText: fuzzyTextFilter,
  numeric: numericTextFilter,
};
const selectionHook = (hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection

    {
      id: '_selector',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 45,
      width: 45,
      maxWidth: 45,
      Aggregated: undefined,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <HeaderCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: CellProps<any>) => <RowCheckbox {...row.getToggleRowSelectedProps()} />,
    },
    ...columns,
  ]);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const headerProps = <T extends Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  props: any,
  { column }: Meta<T, { column: HeaderGroup<T> }>
) => getStyles(props, column && column.disableResizing, column && column.align);
export function Table<T extends Record<string, unknown>>({
  name,
  columns,
  onClick,
  canGroupBy,
  canSort,
  canSelect,
  canResize,
  actionColumn,
  showGlobalFilter,
  showFilter,
  showColumnIcon,
  filterActive,
  setLocalFilterActive,
  customJsxSideFilterButton,
  setSelectedRows,
  elevationTable,
  minHeight,
  maxHeight,
  ...props
}: React.PropsWithChildren<TableProperties<T>>): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  if (name === undefined || name === null) {
    name = 'mytable';
  }
  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

  const customHooks = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns) => [
      ...columns,
      {
        id: 'hidecolumns',
        accessor: 'hidecolumns',
        disableResizing: false,
        disableGroupBy: true,
        disableFilters: true,
        disableSortBy: true,
        canFilter: false,
        minWidth: 60,
        width: 60,
        maxWidth: 100,
        Header: () => (
          <div className='dropdown '>
            <div id='dropdownHideColomuns' data-bs-toggle='dropdown'>
              <ChoiceIcon height={25} width={25} />
            </div>

            <ul className='dropdown-menu ' aria-labelledby='dropdownHideColomuns'>
              <ColumnHidePageCustom instance={instance} />
            </ul>
          </div>
        ),

        Cell(cell: any) {
          const ActionColumnComponent = actionColumn as React.ElementType;
          return <ActionColumnComponent selectedRow={cell.row} />;
        },
      },
    ]);
  };

  const hooks = [
    useColumnOrder,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useFlexLayout,
    usePagination,
    useResizeColumns,
    useRowSelect,
  ];
  // eslint-disable-next-line
  let localHooks = hooks;

  if (canSelect) {
    localHooks.push(selectionHook as any);
  }
  if (actionColumn !== undefined) {
    localHooks.push(customHooks as any);
  }
  const filterOptions = { filteredIds: [] };

  const instance = useTable<T>(
    {
      ...props,
      columns,
      filterTypes,
      defaultColumn,
      getSubRows: (row: any) => row.subRows,
      globalFilter: (rows, columnIds, filterValue) => DefaultGlobalFilter(rows, columnIds, filterValue, filterOptions),

      initialState,
    },
    ...localHooks
  );
  const { headerGroups, getTableBodyProps, page, prepareRow, state, selectedFlatRows } = instance;
  const debouncedState = useDebounce(state, 200);

  React.useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } = debouncedState;
    setInitialState({
      sortBy,
      filters,
      pageSize,
      columnResizing,
      hiddenColumns,
    });

    if (setSelectedRows !== undefined) {
      setSelectedRows!(selectedFlatRows.map((row: any) => row.original));
    }
    // eslint-disable-next-line
  }, [setInitialState, debouncedState]);

  const cellClickHandler = (cell: Cell<T>) => () => {
    onClick && !cell.column.isGrouped && !cell.row.isGrouped && cell.column.id !== '_selector' && onClick(cell.row);
  };

  const isMobile = IsMobileView();
  return (
    <>
      {!isMobile ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: filterActive ? '2fr 1fr ' : 'auto',
            gridColumnGap: '4px',
          }}
        >
          <Card style={{ border: '0px' }}>
            <CardHeader
              id='TableToolbar'
              className={!showGlobalFilter && !showFilter && !showColumnIcon ? 'd-none' : classes.cardHeaderCss}
            >
              <TableToolbar
                instance={instance}
                {...{
                  showGlobalFilter,
                  showFilter,
                  showColumnIcon,
                  filterActive,
                  setLocalFilterActive,
                  customJsxSideFilterButton,
                }}
              />
              <FilterChipBar instance={instance} />
            </CardHeader>

            <CardBody
              id={name}
              style={{
                marginRight: '0',
                marginLeft: '0',
                padding: 0,
                paddingTop: '4px !important ',

                border: '1px solid rgba(0,0,0,.125)',
              }}
            >
              <Grid container id='tablecontainer' direction={'row'} sx={{ display: 'grid' }}>
                <TableContainer
                  sx={{
                    paddingRight: '0!important',
                    paddingLeft: '0!important',
                    overflowX: 'auto',
                    overflowY: page.length === 0 ? 'hidden' : 'auto',
                    display: 'block',
                    width: '100%',
                    WebkitOverflowScrolling: 'touch',
                    MsOverflowStyle: '-ms-autohiding-scrollbar',
                    flex: '1 1 auto',
                    paddingBottom: '1rem',
                    marginTop: '0 !important',
                    paddingTop: '0 !important',
                    maxHeight: maxHeight === 0 || maxHeight === '' || maxHeight === undefined ? '630px' : maxHeight,
                    minHeight: minHeight === 0 || minHeight === '' || minHeight === undefined ? '580px' : minHeight,
                  }}
                  className='table-responsive'
                >
                  <RawTable>
                    <TableHead>
                      {headerGroups.map((headerGroup) => {
                        const {
                          key: headerGroupKey,
                          title: headerGroupTitle,
                          role: headerGroupRole,
                          ...getHeaderGroupProps
                        } = headerGroup.getHeaderGroupProps();
                        return (
                          <TableHeadRow key={headerGroupKey} {...getHeaderGroupProps}>
                            {headerGroup.headers.map((column) => {
                              const style = {
                                textAlign: column.align ? column.align : 'left ',
                              } as React.CSSProperties;
                              const {
                                key: headerKey,
                                role: headerRole,
                                ...getHeaderProps
                              } = column.getHeaderProps(headerProps);
                              const { title: groupTitle = '', ...columnGroupByProps } = column.getGroupByToggleProps();
                              const { title: sortTitle = '', ...columnSortByProps } = column.getSortByToggleProps();

                              return (
                                <TableHeadCell key={headerKey} {...getHeaderProps}>
                                  {canGroupBy
                                    ? column.canGroupBy && (
                                        <Tooltip title={groupTitle}>
                                          <TableSortLabel
                                            active
                                            // direction={column.isGrouped ? 'desc' : 'asc'}
                                            IconComponent={KeyboardArrowRight}
                                            {...columnGroupByProps}
                                            className={classes.headerIcon}
                                          />
                                        </Tooltip>
                                      )
                                    : null}
                                  {column.canSort && canSort ? (
                                    <Tooltip title={sortTitle}>
                                      <TableSortLabel
                                        active={column.isSorted}
                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                        {...columnSortByProps}
                                        className={classes.tableSortLabel}
                                        style={{ flexDirection: 'row-reverse' }}
                                      >
                                        {column.render('Header')}
                                      </TableSortLabel>
                                    </Tooltip>
                                  ) : (
                                    <TableLabel style={style}>{column.render('Header')}</TableLabel>
                                  )}
                                  {/*<div>{column.canFilter ? column.render('Filter') : null}</div>*/}
                                  {canResize ? column.canResize && <ResizeHandle column={column} /> : null}
                                </TableHeadCell>
                              );
                            })}
                          </TableHeadRow>
                        );
                      })}
                    </TableHead>
                    <TableBody {...getTableBodyProps()} className={page.length === 0 ? classes.SvgNoDataCss : ''}>
                      {page.length !== 0
                        ? page.map((row) => {
                            prepareRow(row);
                            const { key: rowKey, role: rowRole, ...getRowProps } = row.getRowProps();

                            return (
                              <TableRow
                                key={rowKey}
                                {...getRowProps}
                                className={cx({
                                  rowSelected: row.isSelected,
                                  clickable: onClick,
                                })}
                              >
                                {row.cells.map((cell) => {
                                  const {
                                    key: cellKey,
                                    role: cellRole,
                                    ...getCellProps
                                  } = cell.getCellProps(cellProps);

                                  return (
                                    <TableCell key={cellKey} {...getCellProps} onClick={cellClickHandler(cell)}>
                                      {cell.isGrouped ? (
                                        <>
                                          <TableSortLabel
                                            classes={{
                                              iconDirectionAsc: classes.iconDirectionAsc,
                                              iconDirectionDesc: classes.iconDirectionDesc,
                                            }}
                                            active
                                            direction={row.isExpanded ? 'desc' : 'asc'}
                                            IconComponent={KeyboardArrowUp}
                                            {...row.getToggleRowExpandedProps()}
                                            className={classes.cellIcon}
                                          />{' '}
                                          {cell.render('Cell', {
                                            editable: false,
                                          })}{' '}
                                          ({row.subRows.length})
                                        </>
                                      ) : cell.isAggregated ? (
                                        cell.render('Aggregated')
                                      ) : cell.isPlaceholder ? null : (
                                        cell.render('Cell')
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                        : null}
                    </TableBody>
                  </RawTable>
                  <div className={page.length === 0 ? classes.SvgNoDataCss : 'd-none'}>
                    <SvgNoData />
                  </div>
                </TableContainer>
              </Grid>
            </CardBody>
            <CardFooter
              id='TablePagination'
              style={{
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,.125)',
                borderTop: '0px',
                borderRadius: '0px 0px 12px 12px',
              }}
            >
              <TablePagination<T> instance={instance} />
            </CardFooter>
          </Card>
          {/* here the filter component is always in the right place*/}
          {filterActive ? (
            <Card style={{ border: '0px' }}>
              <CardHeader
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  // marginBottom: '2px',
                  maxHeight: '64px !important',
                  justifyContent: 'space-between',
                }}
                className={`${classes.FiltersCss} ${classes.cardHeaderCss}`}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '10px',
                  }}
                >
                  <FilterIcon className={classes.tableFilterAltOutlinedIcon} style={{ flexDirection: 'row-reverse' }} />
                  <StyledH2>{t('Filtre(s)')}</StyledH2>
                </Box>

                <CrossIcon
                  height={11}
                  width={25}
                  onClick={() => {
                    setLocalFilterActive!(false);
                  }}
                />
              </CardHeader>
              <CardBody
                id='filterbody'
                style={{
                  marginRight: '0',
                  marginLeft: '0',
                  padding: 0,
                  paddingTop: '4px !important ',
                  border: '1px solid rgba(0,0,0,.125)',
                  backgroundColor: 'white',
                  borderTop: '1px solid rgba(0,0,0,.125)',
                  borderRadius: '0px 0px 12px 12px ',
                  // borderRadius: '20px 20px 12px 12px !important;',
                }}
              >
                <FilterPageCustom<T>
                  instance={instance}
                  setLocalFilterActive={setLocalFilterActive}
                  filterActive={filterActive}
                />
              </CardBody>
            </Card>
          ) : null}
        </div>
      ) : (
        <React.Fragment>
          {/* MOBILE EXPANDABLE LIST OF CARDS */}
          <CardHeader
            id='TablePagination'
            style={{ marginBottom: '2px' }}
            className={!showGlobalFilter && !showFilter && !showColumnIcon ? 'd-none' : classes.cardHeaderCss}
          >
            <TableToolbar
              instance={instance}
              {...{
                showGlobalFilter,
                showFilter,
                showColumnIcon,
                filterActive,
                setLocalFilterActive,
                customJsxSideFilterButton,
              }}
            />
            <FilterChipBar instance={instance} />
          </CardHeader>
          <CardBody
            id={name}
            style={{
              marginRight: '0',
              marginLeft: '0',
              padding: 0,
              paddingTop: '4px ',
              minHeight: '100vh',
            }}
          >
            <CollapsibleTable props={instance} />
          </CardBody>
          <CardFooter id='TablePagination' style={{ backgroundColor: 'white', padding: '0' }}>
            <TablePagination<T> instance={instance} />
          </CardFooter>
          {filterActive ? (
            <FilterModalMobile
              instance={instance}
              setLocalFilterActive={setLocalFilterActive}
              filterActive={filterActive}
            />
          ) : null}
        </React.Fragment>
      )}
    </>
  );
}
