import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { userLogout } from '../../services/reducers/auth';
import { error } from 'console';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => {
        nav('/login', { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
