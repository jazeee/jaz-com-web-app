import { CssBaseline, ThemeProvider } from "@mui/material";
import { APP_THEME } from "./Mui/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
