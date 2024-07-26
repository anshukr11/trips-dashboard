import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Trip } from '../types';

interface TripsTableProps {
  trips: Trip[];
  page: number;
  selectedStatus: Trip['currentStatus'] | null;
  onEditTrip: (trip: Trip) => void;
  totalTrips: number; 
  rowsPerPage: number;
  handlePageChange: any
  handleRowsPerPageChange: any
}

type OrderBy = keyof Trip;

export default function TripsTable({
  trips,
  selectedStatus,
  onEditTrip,
  totalTrips,
  rowsPerPage,
  handleRowsPerPageChange,
  handlePageChange,
  page,
}: TripsTableProps) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('tripId'); // Assuming 'tripId' is a property of Trip
  const [selectedIdx, setSelectedIdx] = useState('');
  const [paginatedTrips, setPaginatedTrips] = useState<Trip[]>([]);

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    populateTrips()
  }, [selectedStatus, page, order, orderBy, trips])

  const populateTrips = () => {
    const sortedTrips = trips
    .filter((trip) => !selectedStatus || trip.currentStatus === selectedStatus)
    .sort((a: any, b: any) => {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) return isAsc ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return isAsc ? 1 : -1;
      return 0;
    });

    setPaginatedTrips(sortedTrips)
  }

  const getStyles = (currStatus: any) => {
    const commonStyles = {
      width: 'fit-content',
      padding: '2px 12px',
      borderRadius: '4px',
    };

    if (currStatus === 'Delivered') {
      return {
        ...commonStyles,
        backgroundColor: '#fff4e8',
        color: '#FE9023',
      };
    }

    if (currStatus === 'Delayed') {
      return {
        ...commonStyles,
        backgroundColor: '#feefef',
        color: '#CC3333',
      };
    }

    if (currStatus === 'Ontime') {
      return {
        ...commonStyles,
        backgroundColor: '#e7f4ef',
        color: '#038700',
      };
    }

    if (currStatus === 'Others') {
      return {
        ...commonStyles,
        backgroundColor: '#eaeaea',
        color: '#313131',
      };
    }

    return {
      ...commonStyles,
      backgroundColor: '#ebf3fe',
      color: '#3388EB',
    };
  };

  const renderColumns = (column: string) => {
    return (
      <Typography color={'#313131'}>{column}</Typography>
    )
  }

  return (
    <Paper>
      <TableContainer>
        <Table
          sx={{
            '& .MuiTableCell-root': {
              fontSize: '12px',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
               <Checkbox />
             </TableCell>
              <TableCell sortDirection={orderBy === 'tripId' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'tripId'}
                  direction={orderBy === 'tripId' ? order : 'asc'}
                  onClick={() => handleRequestSort('tripId')}
                >
                  {renderColumns('Trip ID')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'transporter' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'transporter'}
                  direction={orderBy === 'transporter' ? order : 'asc'}
                  onClick={() => handleRequestSort('transporter')}
                >
                  {renderColumns('Transporter')}

                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'source' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'source'}
                  direction={orderBy === 'source' ? order : 'asc'}
                  onClick={() => handleRequestSort('source')}
                >
                  {renderColumns('Source')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'dest' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'dest'}
                  direction={orderBy === 'dest' ? order : 'asc'}
                  onClick={() => handleRequestSort('dest')}
                >
                 {renderColumns(' Destination')}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'currentStatus' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'currentStatus'}
                  direction={orderBy === 'currentStatus' ? order : 'asc'}
                  onClick={() => handleRequestSort('currentStatus')}
                >
                  {renderColumns('Status')}
                  <img src="filters.svg" alt="filter" />
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'tatStatus' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'tatStatus'}
                  direction={orderBy === 'tatStatus' ? order : 'asc'}
                  onClick={() => handleRequestSort('tatStatus')}
                >
                  {renderColumns('TAT Status')}
                  <img src="filters.svg" alt="filter" />
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrips.map((trip) => (
              <TableRow
                hover
                key={trip._id}
                onClick={() => onEditTrip(trip)}
                selected={selectedStatus === trip.currentStatus}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                   onChange={() => {
                      setSelectedIdx(selectedIdx === trip._id ? '' : trip._id);
                      onEditTrip(trip);
                   }}
                  checked={selectedIdx === trip._id}
                />
                </TableCell>
                <TableCell>{trip.tripId}</TableCell>
                <TableCell>{trip.transporter}</TableCell>
                <TableCell>{trip.source}</TableCell>
                <TableCell>{trip.dest}</TableCell>
                <TableCell>
                  <Typography style={getStyles(trip.currentStatus)} fontSize={'12px'}>
                    {trip.currentStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={getStyles(trip.tatStatus)} fontSize={'12px'}>
                    {trip.tatStatus}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalTrips}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
}