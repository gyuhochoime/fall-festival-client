import { useState, useEffect } from 'react';
import { useToastStore } from '@/stores/useToastStore';
import * as S from './Toast.styles';

export function Toast() {
  const { message, show } = useToastStore();

  // This state ensures the exit animation plays correctly
  // by not rendering the component with $show={false} on initial page load.
  const [wasShown, setWasShown] = useState(false);

  useEffect(() => {
    if (show) {
      setWasShown(true);
    }
  }, [show]);

  if (!wasShown) {
    return null;
  }

  return <S.ToastContainer $show={show}>{message}</S.ToastContainer>;
}
