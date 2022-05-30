import React from 'react';

import { useTranslation } from 'react-i18next';
import { TableInstance } from 'react-table';

import { AngleDoubleSmallLeftIcon } from '../components/assets/AngleDoubleSmallLeftIcon';
import { AngleDoubleSmallRightIcon } from '../components/assets/AngleDoubleSmallRightIcon';
import { AngleSmallLeftIcon } from '../components/assets/AngleSmallLeftIcon';
import { AngleSmallRightIcon } from '../components/assets/AngleSmallRightIcon';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export function TablePagination<T extends Record<string, unknown>>({
  instance,
}: React.PropsWithChildren<{
  instance: TableInstance<T>;
}>): React.ReactElement | null {
  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    pageOptions,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = instance;
  const handleChangePage = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
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

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const { t } = useTranslation();

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className='d-flex justify-content-end  pagination'>
        <div className='d-flex align-items-center'>
          {t('Rows per page')}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            style={{ marginRight: '32px', marginLeft: '8px' }}
          >
            {[10, 20, 30, 40, 50, 250].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <button className='btn' onClick={handleFirstPageButtonClick} disabled={!canPreviousPage}>
          <AngleDoubleSmallLeftIcon height={20} width={20} />
        </button>
        <button className='btn' onClick={handleBackButtonClick} disabled={!canPreviousPage}>
          <AngleSmallLeftIcon height={20} width={20} />
        </button>
        <span className='d-flex align-items-center'>
          Page {pageIndex + 1} sur {pageOptions.length}
        </span>
        <button className='btn' onClick={handleNextButtonClick} disabled={!canNextPage}>
          <AngleSmallRightIcon height={20} width={20} />
        </button>
        <button className='btn' onClick={handleLastPageButtonClick} disabled={!canNextPage}>
          <AngleDoubleSmallRightIcon height={20} width={20} />
        </button>
      </div>
    );
  }

  return rowCount ? (
    <TablePaginationActions count={rowCount} rowsPerPage={pageSize} page={pageIndex} onPageChange={handleChangePage} />
  ) : null;
}
