import { RouterProvider } from 'react-router-dom';
import router from './router';
import { TotalProvider } from '../src/components/TotalContext';

function App() {
  return (
    <>
      <TotalProvider>
        <RouterProvider router={router} />
      </TotalProvider>
    </>
  );
}

export default App;
