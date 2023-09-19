import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Onboarding from 'pages/onboarding/Onboarding';
import LandingPage from 'pages/client-facing/LandingPage';
import HairdresserProfile from 'pages/profile/HairdresserProfile';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'onboarding',
      element: <Onboarding />
    },
    {
      path: 'clientfacing',
      element: <LandingPage />,
    },
    {
      path: 'hairsalon',
      element: <HairdresserProfile />
    }
  ]
};

export default LoginRoutes;
