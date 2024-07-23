import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'grey',
  },
}));

interface StatusCounterProps {
  label: string;
  count: number;
  onClick: () => void;
}

export default function StatusCounter({ label, count, onClick }: StatusCounterProps) {
  return (
    <StyledPaper onClick={onClick}>
      <Typography variant="h6" component="div">
        {label}
      </Typography>
      <Typography variant="h4" component="div">
        {count}
      </Typography>
    </StyledPaper>
  );
}