/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Auth
export const Login = loadable(() =>
  import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() =>
  import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(() =>
  import('./Pages/Users/ResetPassword'), {
  fallback: <Loading />,
});

//Dashboard
export const DashboardPage = loadable(() => import("./Pages/Dashboard"), {
  fallback: <Loading />,
});

//Patient
export const AllPatient = loadable(() => import("./Pages/AllPatient"), {
  fallback: <Loading />,
});
export const Details = loadable(() => import("./Pages/AllPatient/Details"), {
  fallback: <Loading />,
});

//Message
export const Chat = loadable(() => import("./Pages/Chat"), {
  fallback: <Loading />,
});
export const Contact = loadable(() => import("./Pages/Contact"), {
  fallback: <Loading />,
});

//User Profile
export const Profile = loadable(() =>
  import('./Pages/UserProfile'), {
  fallback: <Loading />,
});
export const ChangePassword = loadable(() =>
  import('../components/Forms/ChangePassword'), {
  fallback: <Loading />,
});

//NotFound
export const NotFound = loadable(() =>
  import('./NotFound/NotFound'), {
  fallback: <Loading />,
});

//Parent
export const Parent = loadable(() =>
  import('./Parent'), {
  fallback: <Loading />,
});
