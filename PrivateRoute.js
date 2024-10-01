// components/PrivateRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = false; // Implementar lógica de autenticación

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
