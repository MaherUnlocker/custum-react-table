# Custom react table By M@HeR

**Custom-react-table** is based on <code>React-Table v7</code>: collection of hooks for **building powerful tables and datagrid experiences**. These hooks are lightweight, composable, and ultra-extensible, but **do not render any markup or styles for you**. This effectively means that React Table is a "headless" UI library.

**Desktop Version:**

![alt text](https://user-images.githubusercontent.com/30791819/157678784-2e49fddd-5766-4185-a816-2e36b2a60037.png)

**Mobile Version:**

![alt text](https://user-images.githubusercontent.com/30791819/157678930-6004a305-fac9-40de-b549-68a6e7798d8e.png)

## greets to

> https://github.com/atefBB

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Installation

You can install React Table with [NPM](https://npmjs.com),
[Yarn](https://yarnpkg.com)

```sh
npm install @maherunlocker/custom-react-table
 --save
```

or

```sh
yarn add @maherunlocker/custom-react-table
```

This package is compatible with React v16.8+ and works with ReactDOM.

### How to use

```jsx



import { DynamicTable } from @maherunlocker/custom-react-table

//this the format of object if you need to add custom columns to table with your personal jsx
interface customColumnProps {
  indexOFColumn: number;  //position of column to insert it
  columnName: string;    //name of column
  customJsx:  React.ReactNode;;   //react componant
}

let arrayOfCustomColumns: customColumnProps[] = [];


function customJsxComponent(props: any) {
  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='dropdown'>
        <button
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          // className=" dropdown-toggle"
        >
          test
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <div className='dropdown-item' onClick={() => console.log({ props })}>
            react
          </div>
          <div className='dropdown-item'>table</div>
        </div>
      </div>
    </div>
  );
}


arrayOfCustomColumns.push(
  { indexOFColumn: 0, columnName: 'columnName1', customJsx: SelectAccountDropdown2 },
  { indexOFColumn: 2, columnName: 'columnName2', customJsx: SelectAccountDropdown }
);




export default function App(): JSX.Element {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [dataIsUpdated, setDataIsUpdated] = React.useState<boolean | number>(false);
  const [data, setData] = React.useState<any[]>([]);
  return (
    <>
      <DynamicTable
        //put your backed api url it's obligation  to get your date from api

        url='http://localhost:4000/client'
        // url='http://localhost:4000/cards'
        //optionnal props
         name="mytable"
        setData={setData}  //--->here to return fetched data only
        // --->here for add custom component in the end of table
        actionColumn={SelectAccountDropdown}
        // --->here you can add component side Filter Button
        customJsxSideFilterButton={<FilterSideComponent />}
        // --->here for grouping columns with same name
        canGroupBy
        // --->here for sorting table
        canSort
        // --->here for resizing with of column
        canResize
        // --->here for row and subrows
        canExpand
        // --->here showing checkbox in the begin of RowTable with return you the checked rows
        canSelect
        setSelectedRows={setSelectedRows}

        // --->here add custom checkbox without only checked row or subrow without depend his parent row
        customSelect
        // --->here showing global filter input on the top of table
        showGlobalFilter
        // --->here showing  filter button  on the top of table
        showFilter
        filterActive={filterActive}
        setLocalFilterActive={setLocalFilterActive}
        // --->here add action header with delete and duplicate
        canDeleteOrDuplicate

        // --->here you can add any column to the table in the specified place with custom name and customjsx
        arrayOfCustomColumns={arrayOfCustomColumns}
        // --->here  if you don't have any other click in row you can use to get clicked row details
        onClick={(row: any) => console.log(row.original)}

        // when you update your backend set dataIsUpdated to true to render table
        setDataIsUpdated={setDataIsUpdated}
        dataIsUpdated={dataIsUpdated}
        // request header to use custom fetching data like language
        requestHeader={{"string":"string"}}
        // if you need your table is elevated in his parent
        elevationTable={8}
        //this for let you modify the height of the table and min height you can put number or string  or calc() function of css
       [ NB: for maxHeight must be less than 100%]
        minHeight='calc(100% - 276px)'
        maxHeight={'200px'}

      />
      <p>Selected Rows: {selectedRows.length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

```

### other info

<span style="color:red">if you use vitejs` project add thisto main :</span>.

```sh
 import "regenerator-runtime/runtime";
```

---> if you need click on row and click on custom cell add to your custom jsx `onClick={(e) => { put here your function; e.stopPropagation(); }}`
--->

### Example for data with expand

. type of response must be like this:

```js
"person": {
  //here list of visible header colums
    "structure": [
      "id",
      "name",
      "lastName"
      "age"
    ],
    //here your data
    "data": [
      {
        "id": 1,
        "name": "Maher",
        "lastName": "unlocker",
        "age": 15,
        "subRows": [
          {
            "id": 2,
            "name": "Maher",
            "lastName": "unlocker",
            "age": 15,
            "subRows": []
          },
          {
            "id": 3,
            "name": "Maher",
            "lastName": "unlocker",
            "age": 15,
            "subRows": []
          }
        ]
      },
      {
        "id": 4,
        "name": "Maher",
        "lastName": "unlocker",
        "age": 15,
        "subRows": []
      }
    ]
  }
```

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## This example uses:

- `useGroupBy` to enable header groups
- `useFilters` for per-column filters. Note that filters are displayed in a separate filter dropdown rather than being embedded in each column header.
- `useSortBy` for column sorting
- `useExpanded` to allow expansion of grouped columns
- `useFlexLayout` for a scalable full width table
- `usePagination` for pagination
- `useResizeColumns` for resizable columns
- `useRowSelect` for row selection
