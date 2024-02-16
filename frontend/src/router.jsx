import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import StudentInfoPage from './pages/StudentInfoPage';
import PaymentBookingPage from './pages/PaymentBookingPage';
import StudentShedulePage from './pages/StudentSchedulePage';

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
    path: '/payment-booking/:id',
    element: <PaymentBookingPage />,
  },
  {
    path: '/my-schedule/:id',
    element: <StudentShedulePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
