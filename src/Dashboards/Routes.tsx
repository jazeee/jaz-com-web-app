import { Route, Routes } from "react-router-dom";
import { ValueView } from "./Value/View";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="values" element={<ValueView />} />
    </Routes>
  );
}
