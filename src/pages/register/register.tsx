import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectorRequestStatus } from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { AppDispatch } from 'src/services/store';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(selectorRequestStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .catch((err) => {
        console.log(err);
        setErrorText((err as Error).message);
      });
  };

  if (status === 'Loading') {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
