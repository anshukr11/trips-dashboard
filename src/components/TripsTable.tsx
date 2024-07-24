import {
  Checkbox,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel,
  Typography
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

  const getStyles = (currStatus: any) => {
    const commonStyles = {
      width: 'fit-content',
      padding: '2px 12px',
      borderRadius: '4px',
    }

    if(currStatus === 'Delivered') {
      return {
        ...commonStyles,
        backgroundColor: '#fff4e8',
        color: '#FE9023'
      }
    } 

    if(currStatus === 'Delayed') {
      return {
        ...commonStyles,
        backgroundColor: '#feefef',
        color: '#CC3333'
      }
    }

    if(currStatus === 'Ontime') {
      return {
        ...commonStyles,
        backgroundColor: '#e7f4ef',
        color: '#038700'
      }
    }

    if(currStatus === 'Others') {
      return {
        ...commonStyles,
        backgroundColor: '#eaeaea',
        color: '#313131'
      }
    }

    return {
      ...commonStyles,
      backgroundColor: '#ebf3fe',
      color: '#3388EB'
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          '& .MuiTableCell-root': {
            fontSize: '12px', 
          },
        }}
      >
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
                <Typography color={'#313131'}> Trip ID</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'transporter'}
                direction={orderBy === 'transporter' ? order : 'asc'}
                onClick={() => handleRequestSort('transporter')}
              >
                <Typography color={'#313131'}>Transporter</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'source'}
                direction={orderBy === 'source' ? order : 'asc'}
                onClick={() => handleRequestSort('source')}
              >
                <Typography color={'#313131'}>Source</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'dest'}
                direction={orderBy === 'dest' ? order : 'asc'}
                onClick={() => handleRequestSort('dest')}
              >
                <Typography color={'#313131'}>Destination</Typography>
                <img src='filters.svg'  alt='filter' />
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'currentStatus'}
                direction={orderBy === 'currentStatus' ? order : 'asc'}
                onClick={() => handleRequestSort('currentStatus')}
              >
                <Typography color={'#313131'}>Status</Typography>
                <img src='filters.svg'  alt='filter' />
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'tatStatus'}
                direction={orderBy === 'tatStatus' ? order : 'asc'}
                onClick={() => handleRequestSort('tatStatus')}
              >
                <Typography color={'#313131'}>TAT Status</Typography>
                <img src='filters.svg'  alt='filter' />
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
              <TableCell><Typography style={getStyles(trip.currentStatus)} fontSize={'12px'}>{trip.currentStatus}</Typography></TableCell>
              <TableCell><Typography style={getStyles(trip.tatStatus)} fontSize={'12px'}>{trip.tatStatus}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}