import { dropdownItems, statusLists } from '@/utils/constants';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Trip } from '../types';
import Dropdown from './common/Dropdown/Dropdown';

export type TripFormData = Partial<Trip>;

const initialFormState: TripFormData = {
  tripId: '',
  transporter: '',
  source: '',
  dest: '',
  currentStatus: 'Booked',
  etaDays: 0,
  _id: '',
  tripEndTime: ''
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
  const [phoneNoErr, setPhoneNoErr] = useState<Record<string, string | boolean>>({ error: false, text: ''});

  useEffect(() => {
    if (initialData) {
      const { _id, tripStartTime, tripEndTime, lastPingTime, currentStatusCode, tatStatus, ...rest } = initialData;
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPhoneNoErr({ error: false, text: ''})
    if(name === 'phoneNumber' && value.length > 10) {
      return
    }
    setFormData(prevData => ({ ...prevData, [name as string]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData?.phoneNumber && formData?.phoneNumber.length < 10) {
      setPhoneNoErr({ error: true, text: 'Invalid phone number'})
      return
    }
    
    onSubmit(formData);
    if (!isEdit) {
      setFormData(initialFormState);
    }
  };

  const handleTimeChange = (value: any) => {
    const newDateTime = dayjs(value).toDate()
    if(formData.currentStatus === 'Delivered') {
      formData.lastPingTime = newDateTime
    }
    formData.tripEndTime = newDateTime
  }


  const renderAddForm = () => {
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
            required
          />
          <Dropdown
            sx={{ width: '47%', marginLeft: '8px', borderRadius: '8px'}}
            label="Transporter"
            name="transporter"
            value={formData.transporter}
            dropdownLists={dropdownItems}
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ width: '47%', marginRight: '8px', borderRadius: '8px'}}
            name="source"
            label="Source"
            margin="normal"
            value={formData.source}
            onChange={handleChange}
            required
          />
          <TextField
            sx={{ width: '47%', marginLeft: '8px', borderRadius: '8px'}}
            label="Destination"
            name="dest"
            margin="normal"
            value={formData.dest}
            onChange={handleChange}
            required
          />

          <TextField
            sx={{ width: '47%', borderRadius: '8px'}}
            name="phoneNumber"
            label="Phone Number"
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
            type='number'
            required
            error={!!phoneNoErr.error}
            helperText={phoneNoErr.text}
          />
      </React.Fragment>
    )
  }

  const renderEditForm = () => {
    return (
      <React.Fragment>
          <Dropdown
            sx={{ width: '100%' }}
            label="Status"
            name="currentStatus"
            value={formData.currentStatus}
            dropdownLists={statusLists}
            onChange={handleChange}
            required
          />
        
        <Box mt={2}>
          <DatePicker 
            label="Time" 
            sx={{ width: '100%'}} 
            onChange={handleTimeChange}
          />
        </Box>
      </React.Fragment>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>{isEdit ? 'Update Status' : 'Add New Trip'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {isEdit ? renderEditForm() :  renderAddForm()}
        </DialogContent>

        <Divider />

        <DialogActions sx={{ margin: '8px'}}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            color='secondary' 
            sx={{ color: '#313131', width: '120px'}}>
          Cancel</Button>

          <Button type="submit" variant="contained" sx={{ minWidth: '120px'}}>
            {isEdit ? 'Update Status' : 'Add Trip'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}