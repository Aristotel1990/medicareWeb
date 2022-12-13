import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
// import MainLayout from '../layouts/main';
// import DashboardLayout from '../layouts/dashboard';
// // import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// // guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// // components
// import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/home");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      ),
    },
    // Dashboard Routes
    {
      path: "home",
      element: (
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      ),
    },
    {
      path: "select",
      element: (
        <AuthGuard>
          <SelectDoctor />
        </AuthGuard>
      ),
    },
    {
      path: "list",
      element: (
        <AuthGuard>
          <ListAppointment />
        </AuthGuard>
      ),
    },
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      ),
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../components/Login")));
const Register = Loadable(lazy(() => import("../components/Signup")));
const SelectDoctor = Loadable(lazy(() => import("../components/SelectDoctor")));
const HomePage = Loadable(lazy(() => import("../components/HomePage")));
const ListAppointment = Loadable(
  lazy(() => import("../components/ListAppointment"))
);
const Dashboard = Loadable(lazy(() => import("../components/Dashboard")));
