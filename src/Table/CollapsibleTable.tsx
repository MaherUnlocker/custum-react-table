import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cell_short: {
    lineHeight: '1.5rem',
    fontWeight: '700!important',
    // width: 100,
    border: '0 !important',
  },
});

function MobileRow(props: any): React.ReactElement {
  const { row, headerGroups } = props;
  const dataRow = row.original;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {headerGroups[0]?.headers

          .filter(
            (headerGroup: any) =>
              headerGroup.id !== '_selector' &&
              headerGroup.id !== 'rating' &&
              headerGroup.id !== 'subRows' &&
              headerGroup.id !== 'hidecolumns' &&
              headerGroup.id !== 'expander' &&
              headerGroup.id !== 'Actions'
          )
          .slice(0, 3)

          .map((headerGroup: any) => {
            if (headerGroup.id === 'image' || headerGroup.id === 'picture') {
              return (
                <TableCell component='th' scope='key' variant='body' key={headerGroup.id}>
                  <img src={dataRow[headerGroup.id]} className='w-25 h-25' alt='' />
                </TableCell>
              );
            }
            return (
              <TableCell component='th' scope='row' key={headerGroup.id}>
                {dataRow[headerGroup.id]}
              </TableCell>
            );
          })}

        <TableCell align='right'>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow style={{ marginTop: '2px' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ marginLeft: 0, marginRight: 0 }}>
              <Table aria-label={row.id}>
                <TableBody>
                  <TableRow key={row.id} sx={{ alignItems: 'between' }}>
                    {headerGroups[0]?.headers

                      .filter(
                        (headerGroup: any) =>
                          headerGroup.id !== '_selector' &&
                          headerGroup.id !== 'rating' &&
                          headerGroup.id !== 'subRows' &&
                          headerGroup.id !== 'hidecolumns' &&
                          headerGroup.id !== 'expander' &&
                          headerGroup.id !== 'Actions'
                      )
                      .slice(3)
                      .map((headerGroup: any) => {
                        if (headerGroup.id === 'image' || headerGroup.id === 'picture') {
                          return (
                            <TableRow component='th' scope='row' key={headerGroup.id}>
                              <TableCell className='tableCellLabel' scope='key' variant='body' align='right'>
                                {headerGroup.id}
                              </TableCell>
                              <TableCell component='th' scope='row' variant='body'>
                                <img src={dataRow[headerGroup.id]} className='w-25 h-25' alt='' />
                              </TableCell>
                            </TableRow>
                          );
                        }
                        return (
                          <TableRow
                            component='th'
                            scope='row'
                            key={headerGroup.id}
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <TableCell scope='key' variant='body' className={classes.cell_short}>
                              {headerGroup.id}
                            </TableCell>
                            <TableCell scope='key' style={{ border: 0 }}>
                              {dataRow[headerGroup.id]}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
// eslint-disable-next-line
export default function CollapsibleTable(props: any): React.ReactElement {
  const { headerGroups, page } = props.props;
  return (
    <TableContainer component={Paper} style={{ minHeight: '200', maxHeight: '99vh', overflowX: 'hidden' }}>
      <Table aria-label='collapsible table' stickyHeader>
        <TableHead id='TableHeader' style={{ zIndex: '200', position: 'sticky', borderTop: '0', top: '0' }}>
          <TableRow>
            {headerGroups[0]?.headers

              .filter(
                (headerGroup: any) =>
                  headerGroup.id !== '_selector' &&
                  headerGroup.id !== 'rating' &&
                  headerGroup.id !== 'subRows' &&
                  headerGroup.id !== 'hidecolumns' &&
                  headerGroup.id !== 'expander' &&
                  headerGroup.id !== 'Actions'
              )
              .slice(0, 3)

              .map((headerGroup: any) => (
                <TableCell key={headerGroup.id}>{headerGroup.id}</TableCell>
              ))}
            <TableCell align='right'>actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {page?.map((row: any) => (
            <MobileRow key={row.id} row={row} headerGroups={headerGroups} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
