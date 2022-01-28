import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { FilterValue, IdType, Row } from 'react-table';
import { DuplicateIcon, TrashIcon } from '@aureskonnect/react-ui';

import LoadingDataAnimation from '../components/LoadingDataAnimation';
import LoadingErrorAnimation from '../components/LoadingDataAnimation/LoadingErrorAnimation';

import { Table } from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function
//that when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

type DynamicTableProps = {
  url: string;
  canGroupBy?: boolean;
  canSort?: boolean;
  canSelect?: boolean;
  canResize?: boolean;
  showGlobalFilter?: boolean;
  showFilterbyColumn?: boolean;
  showColumnIcon?: boolean;
  canExpand?: boolean;
  canDeleteOrDuplicate?: boolean;
  actionColumn?: Function;
};
type apiResultProps = {
  structure: string[];
  data: any;
};
export function DynamicTable({
  url,
  actionColumn,
  canGroupBy,
  canSort,
  canResize,
  canExpand,
  canSelect,
  showGlobalFilter,
  showFilterbyColumn,
  showColumnIcon,
  canDeleteOrDuplicate,
}: DynamicTableProps) {
  const [apiResult, setApiResult] = useState<apiResultProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);

  async function fetchData(url: string) {
    await axios
      .get(url)
      .then((response:any) => {
        setApiResult(response.data);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const apiResultColumns = useMemo(
    () =>
      apiResult
        ? apiResult.structure
            .filter((key) =>  key !== 'subRows')
            .map((key) => {
              if (key === 'image' || key === 'picture') {
                return {
                  Header: key,
                  accessor: key,
                  disableFilters: true,
                  // eslint-disable-next-line
                  Cell: (value: any) => {
                    return (
                      <img
                        src={value.cell.value}
                        className="w-50"
                        alt=""
                      />
                    );
                  },
                };
              }

              return {
                Header: key,
                accessor: key,
                aggregate: 'count',
                Aggregated: ({ cell: { value } }: any) => `${value} `,
              };
            })
        : [],
    [apiResult]
  );

  function duplicateRow(index: number) {
    const duplicatedData: any = { ...apiResult };
    const duplicateRow = duplicatedData?.data[index];
    const firstPart = duplicatedData?.data.slice(0, index + 1);
    const secondPart = duplicatedData?.data.slice(
      index + 1,
      duplicatedData.data.length
    );
    duplicatedData.data = [...firstPart, duplicateRow, ...secondPart];
    setApiResult(duplicatedData);
  }

  const columns: any = useMemo(() => {
    let modifiedColumns: any = apiResultColumns;

    if (canExpand) {
      modifiedColumns = [
        {
          // Build our expander column
          id: 'expander', // Make sure it has an ID
          Header: '',
          Cell: ({ row }: any) =>
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            row.canExpand ? (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 2}rem`,
                  },
                })}
              >
                {/* {row.isExpanded ? <div className='arrowRight'></div> : <div className='arrowDown'></div>} */}
                {row.isExpanded ? '👇' : '👉'}
              </span>
            ) : null,
        },
        ...modifiedColumns,
      ];
    }

    if (canDeleteOrDuplicate) {
      modifiedColumns = [
        ...modifiedColumns,
        {
          Header: 'Actions',
          id: 'Actions',
          accessor: (str: any) => 'delete',

          Cell: ({ row }: any) => (
            <React.Fragment>
              <TrashIcon
                width={25}
                height={25}
                onClick={() => {
                  const dataCopy: any = { ...apiResult };
                  dataCopy.data.splice(row.index, 1);
                  setApiResult(dataCopy);
                }}
              />
              <DuplicateIcon
                width={25}
                height={25}
                onClick={() => {
                  duplicateRow(row.index);
                }}
              />
            </React.Fragment>
          ),
        },
      ];
    }

    return modifiedColumns;
  }, [apiResultColumns]);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (loading) return <LoadingDataAnimation />;
  if (error) return <LoadingErrorAnimation />;

  return (
    <React.Fragment>
      <div className="table-responsive ">
        <Table
          name={'myTable'}
          columns={columns}
          data={apiResult?.data}
          canGroupBy={canGroupBy}
          canSort={canSort}
          canSelect={canSelect}
          canResize={canResize}
          actionColumn={actionColumn}
          showGlobalFilter={showGlobalFilter}
          showFilterbyColumn={showFilterbyColumn}
          showColumnIcon={showColumnIcon}
        />
      </div>
    </React.Fragment>
  );
}
