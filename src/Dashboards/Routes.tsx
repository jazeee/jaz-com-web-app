import { Route, Routes } from "react-router-dom";
import { ValueView } from "./Value/View";
import { GraphView } from "./Graph/View";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="values" element={<ValueView />} />
      <Route path="graph" element={<GraphView />} />
    </Routes>
  );
}
