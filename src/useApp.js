import { useContext } from 'react';
import { StoreContext } from './context/store';

const useApp = () => {
  const { state, actions, ...rest } = useContext(StoreContext);

  return { state, actions, ...rest }
}

export default useApp;