import { useSelector } from '../../services/store';
import {
  isAuthorizedSelector,
  UserSelector
} from '../../services/reducers/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui';

type ProtectedProps = {
  notAuthorized?: boolean;
  component: React.JSX.Element;
};

const Protected = ({ notAuthorized = false, component }: ProtectedProps) => {
  const isAuthorized = useSelector(isAuthorizedSelector);
  const user = useSelector(UserSelector);
  const location = useLocation();

  if (!isAuthorized) {
    return <Preloader />;
  }

  if (notAuthorized && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!notAuthorized && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const IsAuthorized = Protected;
export const NotAuthorized = ({
  component
}: {
  component: React.JSX.Element;
}) => <Protected notAuthorized component={component} />;
