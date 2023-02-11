import React from 'react';
import './App.css';
import { Grid } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomTabBox from './component/customTabBox/customTabBox';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <CustomTabBox />
        </Grid>
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
