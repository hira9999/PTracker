import DashboardLayout from '../components/dashboard/Dashboard';
import { TrackerProvider } from '../context/traker/trackerContext';
import privateRoute from '../container/privateRoute';

function Dashboard() {
  return (
    <TrackerProvider>
      <DashboardLayout />
    </TrackerProvider>
  );
}

export default privateRoute(Dashboard);
