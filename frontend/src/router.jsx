import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/api/register',
    element: <StudentRegistrationPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
