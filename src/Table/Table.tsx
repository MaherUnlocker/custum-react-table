import './table.css';

import {
  CrossIcon,
  FilterIcon,
  StyledLabel,
  StyledSelectInput,
} from '@aureskonnect/react-ui';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  TableContainer,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import cx from 'classnames';
import _concat from 'lodash.concat';
import _uniqby from 'lodash.uniqby';
import _without from 'lodash.without';
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react';
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

import { camelToWords, useDebounce, useLocalStorage } from '../utils';
import CollapsibleTable from './CollapsibleTable';
import { FilterChipBar } from './FilterChipBar';
import { FilterPageCustom } from './FilterPageCustom';
import { fuzzyTextFilter, numericTextFilter } from './filters';
import { ResizeHandle } from './ResizeHandle';
import SettingIcon from './SettingIcon';
import { TablePagination } from './TablePagination';
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
import { TableToolbar } from './TableToolbar';
import { TooltipCellRenderer } from './TooltipCell';

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name: string;
  onAdd?: (instance: TableInstance<T>) => MouseEventHandler;
  onDelete?: (instance: TableInstance<T>) => MouseEventHandler;
  onEdit?: (instance: TableInstance<T>) => MouseEventHandler;
  onClick?: (row: Row<T>) => void;
  canGroupBy?: boolean;
  canSort?: boolean;
  canResize?: boolean;
  canSelect?: boolean;
  showGlobalFilter?: boolean;
  showFilterbyColumn?: boolean;
  showColumnIcon?: boolean;
  filterActive?: boolean;
  actionColumn?: Function;
  setLocalFilterActive?: Function;
}

function DefaultHeader({ column }: HeaderProps<any>) {
  return <>{column.id.startsWith('_') ? null : camelToWords(column.id)}</>;
}

// yes this is recursive, but the depth never exceeds three so it seems safe enough
const findFirstColumn = <T extends Record<string, unknown>>(
  columns: Array<ColumnInstance<T>>
): ColumnInstance<T> =>
  columns[0].columns ? findFirstColumn(columns[0].columns) : columns[0];
// old version

// function DefaultColumnFilter<T extends Record<string, unknown>>({ columns, column }: FilterProps<T>) {
//   const { id, filterValue, setFilter, render } = column;
//   const [value, setValue] = React.useState(filterValue || '');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };
//   // ensure that reset loads the new value
//   useEffect(() => {
//     setValue(filterValue || '');
//   }, [filterValue]);

//   const isFirstColumn = findFirstColumn(columns) === column;
//   return (
//     <TextField
//       name={id}
//       label={render('Header')}
//       InputLabelProps={{ htmlFor: id }}
//       value={value}
//       autoFocus={isFirstColumn}
//       variant='standard'
//       onChange={handleChange}
//       onBlur={(e: any) => {
//         setFilter(e.target.value || undefined);
//       }}
//     />
//   );
// }

// ***************New Version of filter
function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
  rows,
  prepareRow,
}: FilterProps<T>) {
  const { id, filterValue, setFilter, render } = column;
  const [value, setValue] = React.useState(filterValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);
  let FilterArray: any[] = rows.map((row) => {
    prepareRow(row);
    return row.cells
      .filter((cel: any) => {
        const { key: cellKey } = cel.getCellProps();
        return (
          (cellKey as string).replace(/([^\_]*\_){2}/, '') ===
          (column.id as string)
        );
      })

      .map((cell: any) => {
        // console.log(cell.value);
        return String(cell.value);
        // return { label: String(cell.value), value: String(cell.value) };
      })[0];
  });

  // his uniquby from lodash for get unique array of object
  //  let unique: any = uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects

  // his uniquby from lodash for get unique array of object
  let unique: any = [
    ...new Set(_without(FilterArray, undefined, null, 'null', 'undefined')),
  ]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);
  // console.log({ unique });
  const isFirstColumn = findFirstColumn(columns) === column;

  return (
    <>
      {/* <AsyncAutocomplete /> */}
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <Autocomplete
        // disablePortal
        id="combo-box-demo"
        autoComplete={true}
        options={unique}
        // defaultValue={unique[0]}
        // fullWidth
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              sx={{ width: '90%' }}
              //label={render('Header')}
              label=" "
              variant="outlined"
              placeholder="Sélectionner ..."
              onChange={handleChange}
              autoFocus={isFirstColumn}
              onBlur={(e: any) => {
                setFilter(e.target.value || undefined);
              }}
            />
          );
        }}
      />

      {/* <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        defaultValue={FilterArray[0]}
        id={render('Header')}
        name={render('Header')}
        onBlur={(e: any) => {
          setFilter(e.target.value || undefined);
        }}
        options={unique}
        // placeholder='Insert text'
        // onChange={()=>{console.log("jjjj")}}
      /> */}

      {/* <TextField
        name={id}
        label={render('Header')}
        InputLabelProps={{ htmlFor: id }}
        value={value}
        autoFocus={isFirstColumn}
        variant='standard'
        onChange={handleChange}
        onBlur={(e: any) => {
          setFilter(e.target.value || undefined);
        }}
      /> */}
    </>
  );
}

// *************************************

const getStyles = (props: any, disableResizing = false, align = 'left') => [
  props,
  {
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  },
];

const headerProps = <T extends Record<string, unknown>>(
  props: any,
  { column }: Meta<T, { column: HeaderGroup<T> }>
) => getStyles(props, column && column.disableResizing, column && column.align);

const cellProps = <T extends Record<string, unknown>>(
  props: any,
  { cell }: Meta<T, { cell: Cell<T> }>
) =>
  getStyles(
    props,
    cell.column && cell.column.disableResizing,
    cell.column && cell.column.align
  );

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
      Cell: ({ row }: CellProps<any>) => (
        <RowCheckbox {...row.getToggleRowSelectedProps()} />
      ),
    },
    ...columns,
  ]);
  // hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
  //   // fix the parent group of the selection button to not be resizable
  //   const selectionGroupHeader = headerGroups[0].headers[0];
  //   // selectionGroupHeader.canResize = false;
  // });
};
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
  showFilterbyColumn,
  showColumnIcon,
  filterActive,
  setLocalFilterActive,
  ...props
}: PropsWithChildren<TableProperties<T>>): ReactElement {
  const classes = useStyles();

  const [initialState, setInitialState] = useLocalStorage(
    `tableState:${name}`,
    {}
  );

  const customHooks = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns) => [
      ...columns,
      {
        id: 'hidecolumns',
        disableResizing: true,
        disableGroupBy: true,
        minWidth: 60,
        width: 60,
        maxWidth: 100,
        Header: () => {
          return (
            <div className="dropdown">
              <div
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                className=" dropdown-toggle"
              >
                <SettingIcon />
              </div>

              <ul
                className="dropdown-menu "
                aria-labelledby="dropdownMenuButton1"
              >
                <div className="d-flex flex-column">
                  {columns
                    .filter(
                      (column) =>
                        !(column.id === '_selector') &&
                        !(column.id === 'expander')
                    )
                    .map((column: any) => {
                      return (
                        <div
                          key={column.id}
                          className=" pretty p-default p-curve p-fill my-2 d-flex align-items-center"
                        >
                          <input
                            type="checkbox"
                            className="mx-2"
                            {...column.getToggleHiddenProps()}
                          />
                          <div className="state p-primary ">
                            <label>{column.id}</label>
                          </div>
                        </div>
                      );
                    })}
                  <br />
                </div>
              </ul>
            </div>
          );
        },
        Cell: function (cell: any) {
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
  let localHooks = hooks;

  if (canSelect) {
    localHooks.push(selectionHook as any);
  }
  if (actionColumn !== undefined) {
    localHooks.push(customHooks as any);
  }

  const instance = useTable<T>(
    {
      ...props,
      columns,
      filterTypes,
      defaultColumn,
      initialState,
    },
    ...localHooks
  );
  console.log({ instance });
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    prepareRow,
    state,
  } = instance;
  const debouncedState = useDebounce(state, 200);

  useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } =
      debouncedState;
    setInitialState({
      sortBy,
      filters,
      pageSize,
      columnResizing,
      hiddenColumns,
    });
  }, [setInitialState, debouncedState]);

  const cellClickHandler = (cell: Cell<T>) => () => {
    onClick &&
      !cell.column.isGrouped &&
      !cell.row.isGrouped &&
      cell.column.id !== '_selector' &&
      onClick(cell.row);
  };

  const { role: tableRole, ...tableProps } = getTableProps();

  return (
    <Paper elevation={0} sx={{ paddingX: 1 }}>
      <TableToolbar
        instance={instance}
        {...{
          showGlobalFilter,
          showFilterbyColumn,
          showColumnIcon,
          filterActive,
          setLocalFilterActive,
        }}
      />
      <FilterChipBar instance={instance} />

      <Paper elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={1} direction={'row'}>
          <Grid
            container
            item
            xs={filterActive ? 8 : 12}
            className="table-responsive"
          >
            <TableContainer>
              <RawTable {...tableProps}>
                <TableHead>
                  {headerGroups.map((headerGroup) => {
                    const {
                      key: headerGroupKey,
                      title: headerGroupTitle,
                      role: headerGroupRole,
                      ...getHeaderGroupProps
                    } = headerGroup.getHeaderGroupProps();
                    return (
                      <TableHeadRow
                        key={headerGroupKey}
                        {...getHeaderGroupProps}
                      >
                        {headerGroup.headers.map((column) => {
                          const style = {
                            textAlign: column.align ? column.align : 'left ',
                          } as CSSProperties;
                          const {
                            key: headerKey,
                            role: headerRole,
                            ...getHeaderProps
                          } = column.getHeaderProps(headerProps);
                          const {
                            title: groupTitle = '',
                            ...columnGroupByProps
                          } = column.getGroupByToggleProps();
                          const {
                            title: sortTitle = '',
                            ...columnSortByProps
                          } = column.getSortByToggleProps();

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
                                <>
                                  <Tooltip title={sortTitle}>
                                    <TableSortLabel
                                      active={column.isSorted}
                                      direction={
                                        column.isSortedDesc ? 'desc' : 'asc'
                                      }
                                      {...columnSortByProps}
                                      className={classes.tableSortLabel}
                                      style={{ flexDirection: 'row-reverse' }}
                                    >
                                      {column.render('Header')}
                                    </TableSortLabel>
                                  </Tooltip>

                                  {/* <FilterAltOutlinedIcon
                                  className={classes.tableFilterAltOutlinedIcon}
                                  style={{ flexDirection: 'row-reverse' }}
                                /> */}
                                </>
                              ) : (
                                <TableLabel style={style}>
                                  {column.render('Header')}
                                </TableLabel>
                              )}
                              {/*<div>{column.canFilter ? column.render('Filter') : null}</div>*/}
                              {canResize
                                ? column.canResize && (
                                    <ResizeHandle column={column} />
                                  )
                                : null}
                            </TableHeadCell>
                          );
                        })}
                      </TableHeadRow>
                    );
                  })}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    const {
                      key: rowKey,
                      role: rowRole,
                      ...getRowProps
                    } = row.getRowProps();

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
                            <TableCell
                              key={cellKey}
                              {...getCellProps}
                              onClick={cellClickHandler(cell)}
                            >
                              {cell.isGrouped ? (
                                <>
                                  <TableSortLabel
                                    classes={{
                                      iconDirectionAsc:
                                        classes.iconDirectionAsc,
                                      iconDirectionDesc:
                                        classes.iconDirectionDesc,
                                    }}
                                    active
                                    direction={row.isExpanded ? 'desc' : 'asc'}
                                    IconComponent={KeyboardArrowUp}
                                    {...row.getToggleRowExpandedProps()}
                                    className={classes.cellIcon}
                                  />{' '}
                                  {cell.render('Cell', { editable: false })} (
                                  {row.subRows.length})
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
                  })}
                </TableBody>
              </RawTable>
              <Grid
                xs={12}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <TablePagination<T> instance={instance} />
              </Grid>
            </TableContainer>
          </Grid>
          {filterActive ? (
            <>
              <Grid item xs={4}>
                <Box
                  component="div"
                  sx={{
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  className={classes.tableHeadRow}
                >
                  <div>
                    <FilterIcon
                      className={classes.tableFilterAltOutlinedIcon}
                      style={{ flexDirection: 'row-reverse' }}
                    />
                    Filtres
                  </div>

                  <CrossIcon
                    height={11}
                    width={25}
                    onClick={() => {
                      setLocalFilterActive!(false);
                    }}
                  />
                </Box>
                <FilterPageCustom<T>
                  instance={instance}
                  setLocalFilterActive={setLocalFilterActive}
                  filterActive={filterActive}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Paper>

      <Paper sx={{ display: { xl: 'none', md: 'none' } }}>
        {/* MOBILE EXPANDABLE LIST OF CARDS */}
        <CollapsibleTable props={instance} />
      </Paper>
      {/* <TablePagination<T> instance={instance} /> */}
    </Paper>
  );
}
