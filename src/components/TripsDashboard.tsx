// import { Counters, Trip } from '@/types';
// import { calculatePercentage } from '@/utils/helpers';
// import { Box, Button, Container, Grid, Paper, TablePagination } from '@mui/material';
// import { styled } from '@mui/system';
// import React, { useEffect, useState } from 'react';
// import { AddTripForm } from './AddTripForm';
// import { EditTripForm } from './EditTripForm';
// import StatusCounter from './StatusContainer';
// import { TripFormData } from './TripForm';
// import TripsTable from './TripsTable';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100%',
//   marginTop: '1rem',
// }));

// export default function TripsDashboard() {
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [counters, setCounters] = useState<Counters>({
//     total: 0,
//     delivered: 0,
//     inTransit: 0,
//     delayed: 0,
//   });
//   const [selectedStatus, setSelectedStatus] = useState<Trip['currentStatus'] | null>('Delivered');
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     fetchTrips();
//   }, [page, rowsPerPage]);

//   const fetchTrips = async () => {
//     const response = await fetch(`/api/trips?page=${page}&limit=${rowsPerPage}`);
//     const data = await response.json();
//     const processedTrips: Trip[] = data?.data?.map((trip: Trip) => ({
//       ...trip,
//       tatStatus: calculateTATStatus(trip),
//     }));
//     setTrips(processedTrips);
//     calculateCounters(processedTrips);
//   };

//   const calculateCounters = (tripsData: Trip[]) => {
//     const counts = tripsData?.reduce(
//       (acc, trip) => {
//         acc.total++;
//         if (trip.currentStatus === 'Delivered') acc.delivered++;
//         if (trip.currentStatus === 'In Transit') acc.inTransit++;
//         if (trip.tatStatus === 'Delayed') acc.delayed++;
//         return acc;
//       },
//       { total: 0, delivered: 0, inTransit: 0, delayed: 0 } as Counters
//     );
//     setCounters(counts);
//   };

//   const calculateTATStatus = (trip: Trip): Trip['tatStatus'] => {
//     const startTime = new Date(trip.tripStartTime);
//     const endTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
//     const actualDays = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);

//     if (trip.etaDays <= 0) return 'Others';
//     if (actualDays <= trip.etaDays) return 'Ontime';
//     return 'Delayed';
//   };

//   const handleAddTrip: any = async (newTrip: (formData: TripFormData) => void) => {
//     const response = await fetch('/api/trips', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTrip),
//     });
//     if (response.ok) {
//       fetchTrips();
//       setIsAddFormOpen(false);
//     } else {
//       console.error('Failed to add trip');
//     }
//   };

//   const handleEditTrip: any = async (editedTrip: Trip) => {
//     const response = await fetch('/api/trips', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(editedTrip),
//     });
//     if (response.ok) {
//       fetchTrips();
//       setOpenStatusUpdate(false);
//       setSelectedTrip(null);
//     } else {
//       console.error('Failed to update trip');
//     }
//   };

//   const onAddTrip = () => {
//     setIsAddFormOpen(true);
//   };

//   const onStatusUpdate = () => {
//     setOpenStatusUpdate(true);
//   };

//   const renderStatusContainer = () => {
//     return (
//       <React.Fragment>
//         <Grid item xs={12} md={3}>
//           <StatusCounter
//             label="Total Trips"
//             count={counters.total}
//             onClick={() => setSelectedStatus(null)}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <StatusCounter
//             label="Delivered"
//             count={counters.delivered}
//             onClick={() => setSelectedStatus('Delivered')}
//           />
//         </Grid>
//         <Grid item xs={12} md={2}>
//           <StatusCounter
//             label="Delayed"
//             count={counters.delayed}
//             onClick={() => setSelectedStatus('Delayed')}
//             styles={{
//               backgroundColor: '#feefef',
//               color: '#CC3333',
//               borderRight: '1px solid #CC3333',
//               marginRight: '-1.5rem',
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={2} sx={{ paddingLeft: 0 }}>
//           <StatusCounter
//             label="In Transit"
//             count={counters.inTransit}
//             onClick={() => setSelectedStatus('In Transit')}
//             styles={{ marginRight: '-1.5rem' }}
//             percentCompleted={calculatePercentage(counters.inTransit, counters.total)}
//           />
//         </Grid>
//         <Grid item xs={12} md={2} sx={{ paddingLeft: 0 }}>
//           <StatusCounter
//             label="Delivered"
//             count={counters.delayed}
//             onClick={() => setSelectedStatus('Delivered')}
//             percentCompleted={calculatePercentage(counters.delivered, counters.total)}
//           />
//         </Grid>
//       </React.Fragment>
//     );
//   };

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={3} mt={4}>
//         {renderStatusContainer()}
//       </Grid>

//       <StyledPaper>
//         <Box m={2} mr={0} display={'flex'} justifyContent={'flex-end'}>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={onStatusUpdate}
//             disabled={!selectedTrip}
//             sx={{ color: '#313131', marginRight: 2 }}
//           >
//             Update Status
//           </Button>

//           <Button variant="contained" onClick={onAddTrip} sx={{ minWidth: 120 }}>
//             Add Trip
//           </Button>
//         </Box>

//         <TripsTable
//           trips={trips}
//           selectedStatus={selectedStatus}
//           onEditTrip={(checkedTrip) => {
//             setSelectedTrip(selectedTrip?._id == checkedTrip._id ? null : checkedTrip);
//           }}
//         />

//         <TablePagination
//           component="div"
//           count={counters.total}
//           page={page}
//           onPageChange={(event, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(event) => {
//             setRowsPerPage(parseInt(event.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 25]}
//         />
//       </StyledPaper>

//       <AddTripForm
//         open={isAddFormOpen}
//         onClose={() => setIsAddFormOpen(false)}
//         onAddTrip={handleAddTrip}
//       />

//       <EditTripForm
//         open={openStatusUpdate}
//         onClose={() => setOpenStatusUpdate(false)}
//         onEditTrip={handleEditTrip}
//         trip={selectedTrip}
//       />
//     </Container>
//   );
// }


import { Counters, Trip } from '@/types';
import { calculatePercentage } from '@/utils/helpers';
import { Box, Button, CircularProgress, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'material-react-toastify';
import React, { useEffect, useState } from 'react';
import { AddTripForm } from './AddTripForm';
import { EditTripForm } from './EditTripForm';
import StatusCounter from './StatusContainer';
import { TripFormData } from './TripForm';
import TripsTable from './TripsTable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  marginTop: '1rem'
}));

export default function TripsDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [counters, setCounters] = useState<Counters>({
    total: 0,
    delivered: 0,
    inTransit: 0,
    delayed: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState<Trip['currentStatus'] | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTrips, setTotalTrips] = useState(0);

  useEffect(() => {
    fetchTrips(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchTrips = async (page = 0, rowsPerPage = 10) => {
    const response = await fetch(`/api/trips?page=${page}&rowsPerPage=${rowsPerPage}`);
    const data = await response.json();
    const processedTrips: Trip[] = data.data?.map((trip: Trip) => ({
      ...trip,
      tatStatus: calculateTATStatus(trip),
    }));

    setTrips(processedTrips);
    setTotalTrips(data.totalTrips);
    calculateCounters(processedTrips);
  };

  const calculateCounters = (tripsData: Trip[]) => {
    const counts = tripsData?.reduce((acc, trip) => {
      acc.total++;
      if (trip.currentStatus === 'Delivered') acc.delivered++;
      if (trip.currentStatus === 'In Transit') acc.inTransit++;
      if (trip.tatStatus === 'Delayed') acc.delayed++;
      return acc;
    }, { total: 0, delivered: 0, inTransit: 0, delayed: 0 } as Counters);
    setCounters(counts);
  };

  const calculateTATStatus = (trip: Trip): Trip['tatStatus'] => {
    const startTime = new Date(trip.tripStartTime);
    const endTime = trip.tripEndTime ? new Date(trip.tripEndTime) : new Date(trip.lastPingTime);
    const actualDays = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
    
    if (trip.etaDays <= 0) return 'Others';
    if (actualDays <= trip.etaDays) return 'Ontime';
    return 'Delayed';
  };

  const handleAddTrip: any = async (newTrip: TripFormData) => {
    const response = await fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    });
    if (response.ok) {
      fetchTrips(page, rowsPerPage);
      setIsAddFormOpen(false);
      toast.dark('Trip added successfully')
    } else {
      console.error('Failed to add trip');
    }
  };

  const handleEditTrip: any = async (editedTrip: Trip) => {
    const response = await fetch('/api/trips', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTrip),
    });
    if (response.ok) {
      fetchTrips(page, rowsPerPage);
      setOpenStatusUpdate(false);
      setSelectedTrip(null);
      toast.dark('status updated successfully')
    } else {
      console.error('Failed to update trip');
    }
  };

  const onAddTrip = () => {
    setIsAddFormOpen(true);
  }

  const onStatusUpdate = () => {
    setOpenStatusUpdate(true);
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderStatusContainer = () => {
    return (
        <React.Fragment>
            <Grid item xs={12} md={3}>
            <StatusCounter
                label="Total Trips" 
                count={totalTrips} 
                onClick={() => setSelectedStatus(null)} 
            />
            </Grid>
            <Grid item xs={12} md={3}>
                <StatusCounter 
                    label="Delivered" 
                    count={counters.delivered} 
                    onClick={() => setSelectedStatus('Delivered')} 
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <StatusCounter 
                    label="Delayed" 
                    count={counters.delayed} 
                    onClick={() => setSelectedStatus('Delayed')} 
                    styles={{ backgroundColor: '#feefef', color: '#CC3333', borderRight: '1px solid #CC3333', marginRight: '-1.5rem' }}
                />
            </Grid>
            <Grid item xs={12} md={2}  sx={{ paddingLeft: 0}}>
                <StatusCounter 
                    label="In Transit" 
                    count={counters.inTransit} 
                    onClick={() => setSelectedStatus('In Transit')} 
                    styles={{ marginRight: '-1.5rem' }}
                    percentCompleted={calculatePercentage(counters.inTransit, counters.total)}
                />
            </Grid>
            <Grid item xs={12} md={2} sx={{ paddingLeft: 0}}>
                <StatusCounter 
                    label="Delivered" 
                    count={counters.delivered} 
                    onClick={() => setSelectedStatus('Delivered')} 
                    percentCompleted={calculatePercentage(counters.delivered, counters.total)}
                />
            </Grid>
        </React.Fragment>
    )
  }

  const renderLoader = () => {
    return (
      <Box display={'flex'} justifyContent={'center'} alignContent={'center'} mt={12}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
        <Grid container spacing={3} mt={4}>    
            {renderStatusContainer()}
        </Grid>

        {!trips?.length ? renderLoader() :
            <StyledPaper>
                <Box m={2} mr={0} display={'flex'} justifyContent={'flex-end'} >
                    <Button 
                        variant="outlined"  
                        color='secondary' 
                        onClick={onStatusUpdate} 
                        disabled={!selectedTrip}
                        sx={{ color: '#313131', marginRight: 2}}
                    >Update Status</Button>

                    <Button 
                        variant="contained" 
                        onClick={onAddTrip} 
                        sx={{ minWidth: 120}}
                    >Add Trip</Button>
                </Box>

                <TripsTable
                    trips={trips} 
                    selectedStatus={selectedStatus}
                    onEditTrip={(checkedTrip) => {
                        setSelectedTrip(selectedTrip?._id == checkedTrip._id ? null : checkedTrip)
                    }}
                    totalTrips={totalTrips}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                    page={page}
                />
            </StyledPaper>
          }

        <AddTripForm
            open={isAddFormOpen} 
            onClose={() => setIsAddFormOpen(false)} 
            onAddTrip={handleAddTrip} 
        />

        <EditTripForm
            open={openStatusUpdate} 
            onClose={() => setOpenStatusUpdate(false)} 
            onEditTrip={handleEditTrip}
            trip={selectedTrip}
        />
  </Container>
  );
}