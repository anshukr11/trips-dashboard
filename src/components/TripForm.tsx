import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit Trip' : 'Add New Trip'}</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
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

          {/* <TextField
            name="etaDays"
            label="ETA (Days)"
            type="number"
            fullWidth
            margin="normal"
            value={formData.etaDays}
            onChange={handleChange}
          /> */}
        </DialogContent>

        <Divider />
        <DialogActions sx={{ margin: '8px'}}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained">
            {isEdit ? 'Update Status' : 'Add Trip'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}