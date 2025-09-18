import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

function Main() {
  const currentUser = useSelector((state) => state.userR.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      navigate('/login');
    } else if (currentUser.isAdmin === true) {
      navigate('adminmode');
    } else if (currentUser.isAdmin === false) {
      navigate('custommode');
    }
  }, [currentUser])


  return (
    <>
      <Outlet />
    </>

  )
}

export default Main