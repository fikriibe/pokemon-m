import {ModalHeaderHandle} from '../components/modal/ModalHeader';

type Ref = {
  modalHeader?: ModalHeaderHandle;
  modalDetail?: HTMLElement;
};

const ref: Ref = {
  modalHeader: undefined,
  modalDetail: undefined,
};

export const setModalHeader = (modalHeader: ModalHeaderHandle) => {
  ref.modalHeader = modalHeader;
};

export const globalRef = ref;
