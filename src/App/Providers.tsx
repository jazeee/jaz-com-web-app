import { CssBaseline, ThemeProvider } from '@mui/material';
import { APP_THEME } from '../Mui/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsProvider } from '../Settings/context';
import { ReactNode } from 'react';
import { ReadingsProvider } from '../Readings/api';

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders(props: AppProvidersProps) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <ReadingsProvider>
          <ThemeProvider theme={APP_THEME}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ReadingsProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
