import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  padding: '3px',
  marginLeft: '8px',
  border: '1px solid transparent',
  background: '#D7E3FE',
  borderRadius: '4px',
  color: '#24428A'
}));

interface StatusCounterProps {
  label: string;
  count: number;
  onClick: () => void;
  styles?: any;
  percentCompleted?: string | null
}

export default function StatusCounter({ label, count, onClick, percentCompleted = null, styles={} }: StatusCounterProps) {
  return (
    <StyledPaper onClick={onClick} style={{...styles}}>
      <Typography variant="body1" component="div">
        {label}
      </Typography>

      <Box display={'flex'} justifyContent={'flex-start'} mt={2}>
        <Typography variant="h6" component="div" color={'#666666'}>
          {count}
        </Typography>
        {percentCompleted && <StyledBox>
          <Typography>{percentCompleted}</Typography>
        </StyledBox>}
      </Box>
    </StyledPaper>
  );
}