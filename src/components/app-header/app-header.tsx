import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { UsernameSelector } from '../../services/reducers/auth';

export const AppHeader: FC = () => {
  const userName = useSelector(UsernameSelector);

  return <AppHeaderUI userName={userName ? userName : 'Личный кабинет'} />;
};
