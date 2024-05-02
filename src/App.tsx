import { Typography } from '@mui/material'
import { Box, ThemeProvider} from '@mui/system';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link} from 'react-router-dom';
import { AvaliationList } from './features/avaliations/ListAvaliation';
import { AvaliationCreate } from './features/avaliations/CreateAvaliation';
import { SnackbarProvider } from 'notistack';

function App() {
  return ( 
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right"}}>
      <Box 
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.grey[900],
      }}>
        <Header/>
        <Layout>
          <Routes>
            <Route path="/" element={<AvaliationList/>} />
            <Route path="/avaliations" element={<AvaliationList/>} />
            <Route path="/avaliations/create" element={<AvaliationCreate/>} />
            <Route path="/avaliations/edit/:id" element={<AvaliationCreate/>} />

            <Route path="*" element={
              <Box sx={{ color: "white"}}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h3">Page not found</Typography>
              </Box>
            } />
          </Routes>
        </Layout>
      </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;
