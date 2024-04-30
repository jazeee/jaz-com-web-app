import { createTheme } from "@mui/material";

export const APP_THEME = createTheme({
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.75rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
  },
  palette: {
    mode: "dark",
  },
});
