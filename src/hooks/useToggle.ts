import React from 'react';
export type InitialState = undefined | boolean;

const useToggle: (
  initialState?: InitialState,
) => [
  toggle: boolean,
  toggleTrue: () => void,
  toggleFalse: () => void,
] = initialState => {
  const [visible, setVisible] = React.useState<boolean>(initialState ?? false);

  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const dismissModal = React.useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, showModal, dismissModal];
};

export default useToggle;
