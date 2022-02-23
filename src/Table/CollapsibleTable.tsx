import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  cell_short: {
    fontSize: '150px',
    lineHeight: '1.5rem',
    fontWeight: '700!important',
    width: 100,
  },
});

function MobileRow(props: any) {
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
                <TableCell component='th' scope='key' variant='body'>
                  {/* <Box
                    component='img'
                    sx={{
                      objectFit: 'cover',
                      height: '25%',
                      width: '25%',
                      maxHeight: { xs: 100, md: 167 },
                      maxWidth: { xs: 120, md: 250 },
                    }}
                    alt='The house from the offer.'
                    src={dataRow[headerGroup.id]}
                  /> */}

                  <img src={dataRow[headerGroup.id]} className='w-25 h-25' alt='' />
                </TableCell>
              );
            }
            return (
              <TableCell component='th' scope='row'>
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                            <TableRow component='th' scope='row'>
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
                          <TableRow component='th' scope='row'>
                            <TableCell scope='key' variant='body' className={classes.cell_short}>
                              {headerGroup.id}
                            </TableCell>
                            <TableCell scope='key'>{dataRow[headerGroup.id]}</TableCell>
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

export default function CollapsibleTable(props: any) {
  const { headerGroups, page } = props.props;
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 'auto' }}>
      <Table aria-label='collapsible table' stickyHeader>
        <TableHead>
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

              .map((headerGroup: any) => {
                return <TableCell>{headerGroup.id}</TableCell>;
              })}
            <TableCell align='right'>actions</TableCell>;
          </TableRow>
        </TableHead>
        <TableBody>
          {page?.map((row: any) => {
            return <MobileRow key={row.id} row={row} headerGroups={headerGroups} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
