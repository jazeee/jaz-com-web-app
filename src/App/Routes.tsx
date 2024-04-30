import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AppLayout } from "./Layout";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Test</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
