'use client'
import TripsDashboard from '@/components/TripsDashboard'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './globals.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TripsDashboard />
    </ThemeProvider>
  )
}

export default MyApp