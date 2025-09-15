import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { useAuthStore } from './stores/authStore';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <AppRouter />;
}

export default App;
