import { Trip } from '@/types';
import TripForm, { TripFormData } from './TripForm';

interface EditTripFormProps {
    open: boolean;
    onClose: () => void;
    onEditTrip: (formData: TripFormData) => void;
    trip: Trip | null;
  }
  
  export function EditTripForm({ open, onClose, onEditTrip, trip }: EditTripFormProps) {
    return (
      <TripForm
        open={open}
        onClose={onClose}
        onSubmit={onEditTrip}
        initialData={trip}
        isEdit={true}
      />
    );
  }