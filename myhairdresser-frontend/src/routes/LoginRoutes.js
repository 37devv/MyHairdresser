import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Onboarding from 'pages/onboarding/Onboarding';
import LandingPage from 'pages/client-facing/LandingPage';
import HairsalonProfile from 'pages/profile/HairsalonProfile';
import AppointmentConfirmation from 'pages/appointment/AppointmentConfirmation';
import SearchResults from 'pages/client-facing/SearchResults';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/client/',
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
      path: 'landing/',
      element: <LandingPage />,
    },
    {
      path: 'hairsalon/:id',
      element: <HairsalonProfile />
    },
    {
      path: 'appointment/:id',
      element: <AppointmentConfirmation />
    },
    {
      path: 'searchResults',
      element: <SearchResults />
    }
   /*  {
      path: 'results',
      element: <Results/>
    } */
  ]
};

export default LoginRoutes;
