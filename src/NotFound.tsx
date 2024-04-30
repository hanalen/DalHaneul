import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    //
  }, []);
  return <div>404</div>;
}
