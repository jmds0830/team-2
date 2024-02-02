import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Happy Coding 🚀');

  async function fetchFromApi() {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/user'); // Feel free to remove this line and the next one
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <>
      <h1>{message}</h1>
      <button onClick={fetchFromApi}>Get Message from API</button>
    </>
  );
}

export default App;
