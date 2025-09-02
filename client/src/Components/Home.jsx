import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const currentUser = useSelector((state) => state.userR.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      navigate('/login');
    }
  }, [currentUser])


  return (
    <div>Home</div>
  )
}

export default Home