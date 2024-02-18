import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import StudentInfoPage from './pages/StudentInfoPage';
import PaymentBookingPage from './pages/PaymentBookingPage';
import PaymentSchedulePage from './pages/PaymentSchedulePage';
import StudentSchedulePage from './pages/StudentSchedulePage';
import SubjectRegistrationPage from './pages/SubjectRegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <HomePage />,
  },
  {
    path: '/:username',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <StudentRegistrationPage />,
  },
  {
    path: '/student-info/:id',
    element: <StudentInfoPage />,
  },
  {
    path: '/student-info/:id/edit-information',
    element: <StudentInfoPage />,
  },
  {
    path: '/student-info/:id/change-password',
    element: <StudentInfoPage />,
  },
  {
    path: '/subject-registration/:username',
    element: <SubjectRegistrationPage />,
  },
  {
    path: '/payment-booking/:username',
    element: <PaymentBookingPage />,
  },
  {
    path: '/payment-booking/:username/payment-schedule',
    element: <PaymentSchedulePage />,
  },
  {
    path: '/my-schedule/:id',
    element: <StudentSchedulePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
