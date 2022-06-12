import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

type Handler<S> = S | ((prev: S) => S);
type Return<S> = [S, (param: Handler<S>) => void];

function useStateMount<S = undefined>(initial: S): Return<S> {
  const [state, setState] = useState<any>(initial);
  const isMounted = useRef<boolean>(true);

  const handleSetState = useCallback(
    (next: Handler<S>): void => isMounted && setState(next),
    [],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const result = useMemo<Return<S>>(() => {
    return [state, handleSetState];
  }, [handleSetState, state]);

  return result;
}

export default useStateMount;
