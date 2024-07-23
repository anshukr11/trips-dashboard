import { Counters, Trip } from '@/types';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
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
}));

export default function TripsDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [counters, setCounters] = useState<Counters>({
    total: 0,
    delivered: 0,
    inTransit: 0,
    delayed: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState<Trip['currentStatus'] | null>('Delivered');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const response = await fetch('/api/trips');
    const data = await response.json();
    const processedTrips: Trip[] = data.data.map((trip: Trip) => ({
      ...trip,
      tatStatus: calculateTATStatus(trip),
    }));
    setTrips(processedTrips);
    calculateCounters(processedTrips);
  };

  const calculateCounters = (tripsData: Trip[]) => {
    const counts = tripsData.reduce((acc, trip) => {
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

  const handleAddTrip: any = async (newTrip: (formData: TripFormData) => void) => {
    const response = await fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    });
    if (response.ok) {
      fetchTrips();
      setIsAddFormOpen(false);
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
      fetchTrips();
      setIsEditFormOpen(false);
      setSelectedTrip(null);
    } else {
      console.error('Failed to update trip');
    }
  };

  const onAddTrip = () => {
    setIsAddFormOpen(true)
  }

  return (
    <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
        Trips Dashboard
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
            <StatusCounter
                label="Total Trips" 
                count={counters.total} 
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
        <Grid item xs={12} md={3}>
            <StatusCounter 
            label="In Transit" 
            count={counters.inTransit} 
            onClick={() => setSelectedStatus('In Transit')} 
            />
        </Grid>
        <Grid item xs={12} md={3}>
            <StatusCounter 
            label="Delayed" 
            count={counters.delayed} 
            onClick={() => setSelectedStatus('Delayed')} 
            />
        </Grid>
        </Grid>

        <Button variant="contained" onClick={onAddTrip}>Add Trip</Button>

        <StyledPaper>
        <TripsTable
            trips={trips} 
            selectedStatus={selectedStatus}
            onEditTrip={(trip) => {
            setSelectedTrip(trip);
            setIsEditFormOpen(true);
            }}
        />
        </StyledPaper>

        <AddTripForm
            open={isAddFormOpen} 
            onClose={() => setIsAddFormOpen(false)} 
            onAddTrip={handleAddTrip} 
        />
        <EditTripForm
        open={isEditFormOpen} 
        onClose={() => setIsEditFormOpen(false)} 
        onEditTrip={handleEditTrip}
        trip={selectedTrip}
        />
  </Container>
  );
}