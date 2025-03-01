'use client'
import TripsDashboard from '@/components/TripsDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import './globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#C1C1C1',
    },
    text: {
      secondary: '#313131'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})

function MyApp({ Component, pageProps }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
        <CssBaseline />
        <TripsDashboard />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default MyApp