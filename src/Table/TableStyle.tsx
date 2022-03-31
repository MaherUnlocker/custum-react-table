import { Checkbox, styled } from '@mui/material';
import React, { CSSProperties } from 'react';

import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiTableTable from '@mui/material/Table';
import { TableBodyTypeMap } from '@mui/material/TableBody/TableBody';
import { TableCellProps } from '@mui/material/TableCell/TableCell';
import { TableHeadTypeMap } from '@mui/material/TableHead/TableHead';
import { TableRowTypeMap } from '@mui/material/TableRow/TableRow';
import { TableTypeMap } from '@mui/material/Table/Table';
//import { palette } from '@mui/system';
import cx from 'classnames';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  rawTable: {
    borderSpacing: 0,
    border: '1px solid rgba(224, 224, 224, 1)',
    width: '100%',
    borderTop: '0',
    // minHeight: '100vh',
    // marginTop: 5,
  },
  tableHead: {
    position: 'sticky',
    top: '0px',
    zIndex: 200,
    borderTop: '0',
    marginTop: '0',
    marginBottom: '2',
    paddingTop: '0',
  },
  tableHeadRow: {
    // backgroundColor: 'red',

    backgroundColor: '#F8F8FB ',

    color: '#000',
    border: '0px',
    // borderBottom: '1px solid rgba(224, 224, 224, 1)',
    // '&:hover $resizeHandle': {
    //   opacity: 1,
    // },
  },
  tableHeadCell: {
    padding: '16px 1px 16px 16px',
    fontSize: '0.875rem',
    textAlign: 'center',
    maxHeight: 45,
    verticalAlign: 'inherit',
    // color: theme.palette.text.primary,
    fontWeight: '700 !important',
    lineHeight: '1.5rem',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    '&:last-child': {
      borderRight: 'none',
    },
    // borderBottom: '1px solid #555B6D',
  },
  tableBody: {},
  tableRow: {
    color: 'inherit',
    outline: 0,
    verticalAlign: 'middle',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
    },

    borderBottom: '1px rgb(239, 239, 239)',
    '&:last-child': {
      borderBottom: 'none',
    },
    '&.rowSelected': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
      },
    },
    '&.clickable': {
      cursor: 'pointer',
    },
  },
  tableLabel: {},
  tableCell: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    textAlign: 'center',
    fontWeight: 300,
    lineHeight: 1.3,
    verticalAlign: 'inherit',
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRight: '1px solid rgba(224, 224, 224, 1)',
    // '&:last-child': {
    //   borderRight: 'none',
    // },
  },
  resizeHandle: {
    position: 'absolute',
    cursor: 'col-resize',
    zIndex: 100,
    opacity: 0,
    borderLeft: '1px solid #42a5f5',
    borderRight: '1px solid #42a5f5',
    height: '50%',
    top: '25%',
    transition: 'all linear 100ms',
    right: -2,
    width: 3,
    '&.handleActive': {
      opacity: 1,
      border: 'none',
      backgroundColor: '#42a5f5',
      height: 'calc(100% - 4px)',
      top: '2px',
      right: -1,
      width: 1,
    },
  },
  tableSortLabel: {
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 0,
      marginLeft: 2,
    },
  },
  tableFilterAltOutlinedIcon: {
    width: ' 21px !important',
    height: '23px !important',
    marginTop: 0,
    marginRight: 2,
  },
  headerIcon: {
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 4,
      marginRight: 0,
    },
  },
  iconDirectionAsc: {
    transform: 'rotate(90deg)',
  },
  iconDirectionDesc: {
    transform: 'rotate(180deg)',
  },
  iconDirectionRight: {
    transform: 'rotate(180deg)',
  },
  cellIcon: {
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 3,
    },
  },
  FiltersCss: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderSpacing: 0,
    paddingLeft: '0 !important',
    paddingTop: '0 !important',
    height: '45px !important',
    backgroundColor: ' var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box ',
    alignItems: 'center',
    minHeight: '64px',
  },
  DividerCss: {
    background: '#F7F7FA 0% 0% no-repeat padding-box',
    // border: '1px solid #F1F1F1',
    height: '2px',
  },
  SvgNoDataCss: {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignContent: 'center!important',
    alignItems: 'center!important',
    border: '0',
    height: '100%',
  },
  cardHeaderCss: {
    padding: '0 ',
    backgroundColor: 'white',
    // boxShadow: 'rgb(209 197 197) 0px 1px 4px',
    // borderRadius: '5px !important',
    marginBottom: '4px !important',
    border: '1px solid rgba(0,0,0,.125)',
  },
});

const areEqual = (prevProps: any, nextProps: any) =>
  prevProps.checked === nextProps.checked && prevProps.indeterminate === nextProps.indeterminate;

type CN = { className?: string; style?: CSSProperties };

export const RawTable: React.FC<Partial<TableTypeMap> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableTable className={cx(className, classes.rawTable)} {...rest}>
      {children}
    </MuiTableTable>
  );
};

export const TableBody: React.FC<Partial<TableBodyTypeMap> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableBody className={cx(className, classes.tableBody)} {...rest}>
      {children}
    </MuiTableBody>
  );
};

export const TableHead: React.FC<Partial<TableHeadTypeMap> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableHead className={cx(className, classes.tableHead)} {...rest}>
      {children}
    </MuiTableHead>
  );
};

export const TableHeadRow: React.FC<Partial<TableRowTypeMap> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableRow className={cx(className, classes.tableHeadRow)} {...rest}>
      {children}
    </MuiTableRow>
  );
};

export const TableHeadCell: React.FC<Partial<TableCellProps> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableCell className={cx(className, classes.tableHeadCell)} {...rest}>
      {children}
    </MuiTableCell>
  );
};

export const TableRow: React.FC<Partial<TableRowTypeMap> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableRow className={cx(className, classes.tableRow)} {...rest}>
      {children}
    </MuiTableRow>
  );
};

export const TableCell: React.FC<Partial<TableCellProps> & CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiTableCell className={cx(className, classes.tableCell)} {...rest}>
      {children}
    </MuiTableCell>
  );
};

export const TableLabel: React.FC<CN> = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={cx(className, classes.tableLabel)} {...rest}>
      {children}
    </div>
  );
};

export const HeaderCheckbox = React.memo(
  styled(Checkbox)({
    fontSize: '1rem',
    margin: '-8px 0 -8px -15px',
    padding: '8px 9px',
    '& svg': {
      width: '24px',
      height: '24px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  areEqual
);

export const RowCheckbox = React.memo(
  styled(Checkbox)({
    fontSize: '14px',
    margin: '-9px 0 -8px -15px',
    padding: '5px 9px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      width: 24,
      height: 24,
    },
  }),
  areEqual
);
