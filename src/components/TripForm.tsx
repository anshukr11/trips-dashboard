import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { Trip } from '../types';
import Dropdown from './common/Dropdown/Dropdown';

export type TripFormData = Omit<Trip, '_id' | 'tripStartTime' | 'tripEndTime' | 'lastPingTime' | 'currentStatusCode' | 'tatStatus'>;

const initialFormState: TripFormData = {
  tripId: '',
  transporter: '',
  source: '',
  dest: '',
  currentStatus: 'Booked',
  etaDays: 0,
};

interface TripFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: TripFormData) => void;
  initialData?: Trip | null;
  isEdit?: boolean;
}

export default function TripForm({ open, onClose, onSubmit, initialData = null, isEdit = false }: TripFormProps) {
  const [formData, setFormData] = useState<TripFormData>(initialFormState);

  useEffect(() => {
    if (initialData) {
      const { _id, tripStartTime, tripEndTime, lastPingTime, currentStatusCode, tatStatus, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name as string]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEdit) {
      setFormData(initialFormState);
    }
  };

  const RenderAddForm = () => {
    return (
      <React.Fragment>
                  <TextField
            sx={{ width: '47%', marginRight: '8px', borderRadius: '8px'}}
            name="tripId"
            label="Trip ID"
            margin="normal"
            value={formData.tripId}
            onChange={handleChange}
            disabled={isEdit}
          />
          <Dropdown
            sx={{ width: '47%', marginLeft: '8px', borderRadius: '8px'}}
            label="Transporter"
            name="transporter"
            value={formData.transporter}
            onChange={handleChange}
          />

          <TextField
            sx={{ width: '47%', marginRight: '8px', borderRadius: '8px'}}
            name="source"
            label="Source"
            margin="normal"
            value={formData.source}
            onChange={handleChange}
          />
          <Dropdown
            sx={{ width: '47%', marginLeft: '8px', borderRadius: '8px'}}
            label="Destination"
            name="dest"
            value={formData.dest}
            onChange={handleChange}
          />

          <TextField
            sx={{ width: '47%', borderRadius: '8px'}}
            name="phoneNumber"
            label="Phone Number"
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
      </React.Fragment>
    )
  }

  const RenderEditForm = () => {
    return (
      <React.Fragment>
          <Dropdown
            sx={{ width: '100%' }}
            label="Transporter"
            name="transporter"
            value={formData.transporter}
            onChange={handleChange}
          />
        
        <Box mt={2}>
          <DatePicker label="Time" sx={{ width: '100%'}} />
        </Box>
      </React.Fragment>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? 'Update Status' : 'Add New Trip'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {isEdit ? <RenderEditForm /> : <RenderAddForm />}
        </DialogContent>

        <Divider />

        <DialogActions sx={{ margin: '8px'}}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            color='secondary' 
            sx={{ color: '#313131', width: '120px'}}>
          Cancel</Button>

          <Button type="submit" variant="contained">
            {isEdit ? 'Update Status' : 'Add Trip'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}