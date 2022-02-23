import {
  AngleDoubleSmallLeftIcon,
  AngleDoubleSmallRightIcon,
  AngleSmallLeftIcon,
  AngleSmallRightIcon,
} from '@aureskonnect/react-ui';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TablePagination as _MuiTablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { PropsWithChildren, ReactElement, useCallback } from 'react';
import { TableInstance } from 'react-table';

const rowsPerPageOptions = [10, 25, 50];

// avoid all of the redraws caused by the internal withStyles
const interestingPropsEqual = (prevProps: any, nextProps: any) =>
  prevProps.count === nextProps.count &&
  prevProps.rowsPerPage === nextProps.rowsPerPage &&
  prevProps.page === nextProps.page &&
  prevProps.onPageChange === nextProps.onPageChange &&
  prevProps.onChangeRowsPerPage === nextProps.onChangeRowsPerPage;

// a bit of a type hack to keep OverridableComponent working as desired
type T = typeof _MuiTablePagination;
const MuiTablePagination: T = React.memo(
  _MuiTablePagination,
  interestingPropsEqual
) as T;

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    marginLeft: '2.5',
    marginBottom: '0',
  },
});

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export function TablePagination<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {
  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = instance;
  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      if (newPage === pageIndex + 1) {
        nextPage();
      } else if (newPage === pageIndex - 1) {
        previousPage();
      } else {
        gotoPage(newPage);
      }
    },
    [gotoPage, nextPage, pageIndex, previousPage]
  );
  function CustomPagination() {
    return (
      <div className="d-flex justify-content-end mr-3 pagination">
        <div className="d-flex align-items-center">
          Lignes par page :
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <AngleDoubleSmallLeftIcon height={20} width={20} />
        </button>
        <button
          className="btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <AngleSmallLeftIcon height={20} width={20} />
        </button>
        <span className="d-flex align-items-center">
          Page {pageIndex + 1} sur {pageOptions.length}
        </span>
        <button
          className="btn"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <AngleSmallRightIcon height={20} width={20} />
        </button>
        <button
          className="btn"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <AngleDoubleSmallRightIcon height={20} width={20} />
        </button>
      </div>
    );
  }

  const onChangeRowsPerPage = useCallback(
    (e: any) => {
      setPageSize(Number(e.target.value));
    },
    [setPageSize]
  );

  return rowCount ? (
    <React.Fragment>
      {/* <MuiTablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        rowsPerPage={pageSize}
        count={rowCount}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      /> */}
      <CustomPagination />
    </React.Fragment>
  ) : null;
}
