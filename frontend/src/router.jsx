import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import StudentInfoPage from './pages/StudentInfoPage';

const router = createBrowserRouter([
  {
    path: '/',
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
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
