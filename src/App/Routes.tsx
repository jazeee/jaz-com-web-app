import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './Layout';
import { SettingsForm } from '../Settings/Form';
import { DashboardRoutes } from '../Dashboards/Routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<div>Test</div>} />
        <Route path="/settings" element={<SettingsForm />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  );
}
