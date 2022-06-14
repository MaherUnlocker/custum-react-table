import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion/dist/framer-motion';
import { useTranslation } from 'react-i18next';

import { useStyles } from './TableStyle';
import { headerProps } from './Table';
import SvgNoData from '../components/assets/SvgNoData';

const variants = {
  open: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

function MobileRow(props: any): React.ReactElement {
  const { row, cellProps } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        key={`ttt+${row.id}`}
        sx={{ '& > *': { borderBottom: 'unset' }, alignItems: 'center' }}
        style={{
          display: 'grid',
          minWidth: '100vw',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {row.cells

          .filter(
            (cell: any) =>
              cell.column.id !== 'rating' &&
              cell.column.id !== 'subRows' &&
              cell.column.id !== 'hidecolumns' &&
              cell.column.id !== 'expander'
          )
          .slice(0, 3)

          .map((cell: any) => {
            const { key: cellKey } = cell.getCellProps(cellProps);

            return (
              <TableCell key={`cell ${cellKey}`}>
                {' '}
                {cell.render('Cell')}
              </TableCell>
            );
          })}

        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* collapse rest of data of selected row */}
      <TableRow style={{ marginTop: '2px' }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={variants}
              transition={{
                duration: 0.5,
                cubicbezier: [0.29, 1.01, 1, -0.68],
              }} //good for mobile
              style={{ marginLeft: 0, marginRight: 0 }}
            >
              <Table aria-label={row.id}>
                <TableBody>
                  {row.cells

                    .filter(
                      (cell: any) =>
                        cell.column.id !== 'rating' &&
                        cell.column.id !== 'subRows' &&
                        cell.column.id !== 'hidecolumns' &&
                        cell.column.id !== 'expander'
                    )
                    .slice(3)
                    .map((cell: any) => {
                      const { key: cellKey } = cell.getCellProps(cellProps);

                      return (
                        <TableRow
                          key={`celrow+${cellKey}`}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                          }}
                        >
                          <TableCell
                            align="left"
                            scope="key"
                            variant="body"
                            className={classes.cell_short}
                          >
                            {cell.column.Header}
                          </TableCell>
                          <TableCell className={classes.cell_short} />
                          <TableCell
                            key={cellKey}
                            // {...getCellProps}
                            style={{
                              width: 'auto',
                              // flex: 'inherit',
                              alignContent: 'end',
                              display: 'flex',
                              justifyContent: 'start',
                              border: 0,
                            }}
                          >
                            {cell.render('Cell')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </motion.div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
// eslint-disable-next-line
export default function CollapsibleTable(
  instance: any,
  cellClickHandler: any
): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const { headerGroups, page, prepareRow } = instance.props;
  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: '200', maxHeight: '99vh', overflowX: 'hidden' }}
    >
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead
          id="TableHeader"
          style={{
            zIndex: '200',
            position: 'sticky',
            borderTop: '0',
            top: '0',
          }}
        >
          <TableRow
            style={{
              display: 'grid',
              minWidth: '100vw',
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {headerGroups.map((headerGroup: any, index: number) => (
              <React.Fragment key={`headerKey${index}`}>
                {headerGroup.headers
                  .filter(
                    (column: any) =>
                      // column.id !== '_selector' &&
                      column.id !== 'rating' &&
                      column.id !== 'subRows' &&
                      column.id !== 'hidecolumns' &&
                      column.id !== 'expander' &&
                      column.id !== '_Actions'
                  )
                  .slice(0, 3)
                  .map((column: any) => {
                    const { key: headerKey } =
                      column.getHeaderProps(headerProps);
                    return (
                      <TableCell key={headerKey}>
                        {column.render('Header')}
                      </TableCell>
                    );
                  })}
                <TableCell key="actions" align="right">
                  Actions
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {page.length === 0 ? (
            <div className={classes.SvgNoDataCss}>
              <SvgNoData />
            </div>
          ) : (
            page?.map((row: any) => {
              prepareRow(row);
              return (
                <MobileRow
                  key={`mobRoww ${row.id}`}
                  row={row}
                  headerGroups={headerGroups}
                  cellClickHandler={cellClickHandler}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
