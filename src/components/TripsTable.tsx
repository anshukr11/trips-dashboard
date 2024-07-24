import {
  Checkbox,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel
} from '@mui/material';
import { useState } from 'react';
import { Trip } from '../types';

interface TripsTableProps {
  trips: Trip[];
  selectedStatus: Trip['currentStatus'] | null;
  onEditTrip: (trip: Trip) => void;
}

type OrderBy = keyof Trip;

export default function TripsTable({ trips, selectedStatus, onEditTrip }: TripsTableProps) {
  const [orderBy, setOrderBy] = useState<OrderBy>('tripStartTime');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIdx, setSelectedIdx] = useState('')
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTrips = trips?.filter(trip => !selectedStatus || trip.currentStatus === selectedStatus)
    .sort((a: any, b: any) => {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) return isAsc ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return isAsc ? 1 : -1;
      return 0;
    });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow>
            <TableCell> 
                <Checkbox />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'tripId'}
                direction={orderBy === 'tripId' ? order : 'asc'}
                onClick={() => handleRequestSort('tripId')}
              >
                Trip ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'transporter'}
                direction={orderBy === 'transporter' ? order : 'asc'}
                onClick={() => handleRequestSort('transporter')}
              >
                Transporter
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'source'}
                direction={orderBy === 'source' ? order : 'asc'}
                onClick={() => handleRequestSort('source')}
              >
                Source
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'dest'}
                direction={orderBy === 'dest' ? order : 'asc'}
                onClick={() => handleRequestSort('dest')}
              >
                Destination
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'currentStatus'}
                direction={orderBy === 'currentStatus' ? order : 'asc'}
                onClick={() => handleRequestSort('currentStatus')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'tatStatus'}
                direction={orderBy === 'tatStatus' ? order : 'asc'}
                onClick={() => handleRequestSort('tatStatus')}
              >
                TAT Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTrips.map((trip) => (
            <TableRow key={trip._id}>
             <TableCell>
                <Checkbox 
                  onChange={() => {
                    setSelectedIdx(selectedIdx == trip._id ? '' : trip._id)
                    onEditTrip(trip)
                  }} 
                  checked={selectedIdx === trip._id} 
                />
              </TableCell>
              <TableCell>{trip.tripId}</TableCell>
              <TableCell>{trip.transporter}</TableCell>
              <TableCell>{trip.source}</TableCell>
              <TableCell>{trip.dest}</TableCell>
              <TableCell>{trip.currentStatus}</TableCell>
              <TableCell>{trip.tatStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}