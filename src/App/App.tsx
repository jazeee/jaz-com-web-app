import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./Providers";
import { AppRoutes } from "./Routes";

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
