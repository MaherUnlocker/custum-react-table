# Custom react table / Storybook User Guide

`custom-react-table` is based on <code>React-Table v7</code>: collection of hooks for **building powerful tables and datagrid experiences**. These hooks are lightweight, composable, and ultra-extensible, but **do not render any markup or styles for you**. This effectively means that React Table is a "headless" UI library.

<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/30791819/147334536-5de8ed47-4719-4563-b537-f468cfef3fdf.PNG"><img src="https://user-images.githubusercontent.com/30791819/147334536-5de8ed47-4719-4563-b537-f468cfef3fdf.PNG" alt="sample" style="max-width: 100%;"></a>



## greets to 

> https://github.com/atefBB

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Installation

You can install React Table with [NPM](https://npmjs.com),
[Yarn](https://yarnpkg.com), or a good ol' `<script>` via
[unpkg.com](https://unpkg.com).

```sh
npm install @maherunlocker/custom-react-table
 --save
```

or

```sh
yarn add @maherunlocker/custom-react-table
```

This package is compatible with React v16.8+ and works with ReactDOM.

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### How to use





```jsx
import { DynamicTable } from @maherunlocker/custom-react-table

//this the format of object if you need to add custom columns to table with your personal jsx
interface customColumnProps {
  indexOFColumn: number;  //position of column to insert it 
  columnName: string;    //name of column 
  customJsx: Function;   //react componant 
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
  { indexOFColumn: 0, columnName: 'column1', customJsx: SelectAccountDropdown2 },
  { indexOFColumn: 2, columnName: 'column2', customJsx: SelectAccountDropdown }
);




export default function App() {
  //this  to get the filter page is opened or no 
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);

  return (
    <DynamicTable
      //put your backed api url
      
      url='http://localhost:4000/client'
    
      //optionnal props
      actionColumn={SelectAccountDropdown}
      canGroupBy
      canSort
      canResize
      canExpand
      canSelect
      showGlobalFilter
      showFilterbyColumn
      showColumnIcon
      canDeleteOrDuplicate
      filterActive={filterActive}
      setLocalFilterActive={setLocalFilterActive}
      arrayOfCustomColumns={arrayOfCustomColumns}
    />
  );
}

```

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


  * `useGroupBy` to enable header groups
  * `useFilters` for per-column filters.  Note that filters are displayed in a separate filter dropdown rather than being embedded in each column header.
  * `useSortBy` for column sorting
  * `useExpanded` to allow expansion of grouped columns
  * `useFlexLayout` for a scalable full width table
  * `usePagination` for pagination
  * `useResizeColumns` for resizable columns
  * `useRowSelect` for row selection
