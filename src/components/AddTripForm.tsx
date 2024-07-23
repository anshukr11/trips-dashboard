import TripForm, { TripFormData } from './TripForm';

interface AddTripFormProps {
    open: boolean;
    onClose: () => void;
    onAddTrip: (formData: TripFormData) => void;
  }
  
  export function AddTripForm({ open, onClose, onAddTrip }: AddTripFormProps) {
    return (
      <TripForm
        open={open}
        onClose={onClose}
        onSubmit={onAddTrip}
        isEdit={false}
      />
    );
  }