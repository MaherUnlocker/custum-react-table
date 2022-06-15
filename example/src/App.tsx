import { DynamicTable } from '@maherunlocker/custom-react-table';

import React from 'react';
import { stringify } from 'querystring';
// eslint-disable-next-line
function SelectAccountDropdown(original: any) {
  return (
    <div className="w-100">
      <div className="dropdown">
        <button
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          onClick={(e: any) => {
            // alert(original.selectedRow.original);
            e.stopPropagation();
          }}
          // className=" dropdown-toggle"
        />
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div
            className="dropdown-item"
            onClick={(e) => {
              alert(original.selectedRow.original);
              e.stopPropagation();
            }}
          >
            Accéder à la carte
          </div>
          <div className="dropdown-item">Voirffffff la liste des boutiques</div>
        </div>
      </div>
    </div>
  );
}

function SelectAccountDropdown2(original: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-100 ">
      <div className="dropdown">
        <button
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          // className=" dropdown-toggle"
        >
          {open ? <div>One</div> : 'colum1'}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {[1, 2, 3].map((elm, index) => (
            <div
              key={index}
              onClick={() => {
                alert(stringify(original.selectedRow));
                setOpen(true);
              }}
            >
              elm
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterSideComponent(original: any): JSX.Element {
  return (
    <span
      style={{ boxShadow: '0px 0px 4px' }}
      className="badge border border-dark rounded-circle badge-light p-2  rounded"
    >
      3
    </span>
  );
}

interface customColumnProps {
  indexOFColumn: number;
  columnName: string;
  customJsx: React.ReactNode;
}

// eslint-disable-next-line
let arrayOfCustomColumns: customColumnProps[] = [];
arrayOfCustomColumns.push(
  {
    indexOFColumn: 99,
    columnName: 'action',
    customJsx: SelectAccountDropdown2,
  },
  { indexOFColumn: 4, columnName: '_', customJsx: FilterSideComponent }
);

export default function App(): JSX.Element {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [dataIsUpdated, setDataIsUpdated] = React.useState<boolean | number>(
    false
  );
  return (
    // <React.Suspense fallback={null}>
    <DynamicTable
      //put your backed api url it's obligation  to get your date from api
      // name="'mah'"
      // url='http://192.168.2.14:4000/categories'
      url="http://192.168.2.14:4000/client"
      // url='http://192.168.2.14:4000/products'
      //optionnal props
      // --->here for add cusom component in the end of table
      actionColumn={SelectAccountDropdown}
      // --->here you can add component side Filter Button
      customJsxSideFilterButton={<FilterSideComponent />}
      // --->here for grouping columns with same name

      // canGroupBy
      // --->here for sorting table
      canSort
      // showColumnIcon
      // --->here for resising with of column
      canResize
      // --->here for row and subrows
      canExpand
      // --->here showing checkbox in the begin of RowTable with return you the checked rows
      canSelect
      setSelectedRows={setSelectedRows}
      // --->here showing golobal filter input on the top of table
      showGlobalFilter
      // --->here showing  filter button  on the top of table
      showFilter
      filterActive={filterActive}
      setLocalFilterActive={setLocalFilterActive}
      // --->here add action header with delete and duplicate
      canDeleteOrDuplicate
      // --->here you can add any column to the table in the specified place with custom name and customjsx
      arrayOfCustomColumns={arrayOfCustomColumns}
      // --->here  if you dont have any other click in row you can use to get clicked row details

      // onClick={(row: any) => alert('row.original')}
      // when you update your backend set dataIsUpdated to true to render table
      setDataIsUpdated={setDataIsUpdated}
      dataIsUpdated={dataIsUpdated}
      elevationTable={0} //this for let you modify the height of the table and min height you can put number or string
      minHeight="70vh"
      maxHeight="80vh"
    />
  );
}
