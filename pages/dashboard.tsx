import DashboardLayout from '../components/dashboard/Dashboard';
import { TrackerProvider } from '../context/traker/trackerContext';
import privateRoute from '../container/privateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackerProvider>
        <DashboardLayout />
      </TrackerProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default privateRoute(Dashboard);
