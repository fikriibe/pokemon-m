import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {useToggle} from '../../hooks';
import Modal from 'react-native-modal';
import colors from '../../assets/themes/colors';
import Header from '../Header';
import {push} from '../../App';

interface MenuItemData {
  label: string;
  child?: MenuItemData[];
  onPress?: () => void;
}

export type ModalHeaderHandle = {
  show: () => void;
  dismiss: () => void;
};

const MenuItem: React.FC<{item: MenuItemData; index: number}> = ({
  item: {label, onPress},
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapMenuItem, index ? styles.wrapMenuItemBorder : null]}>
      <Text style={styles.textItem}>{label}</Text>
    </TouchableOpacity>
  );
};

const ModalHeader = forwardRef<ModalHeaderHandle, {}>((_, ref) => {
  const [visible, show, dismiss] = useToggle();

  const rendermenuItem = useCallback(props => <MenuItem {...props} />, []);

  const handlePress = useCallback(
    (func: () => void) => () => {
      dismiss();
      func();
    },
    [dismiss],
  );

  useImperativeHandle(
    ref,
    () => ({
      show,
      dismiss,
    }),
    [dismiss, show],
  );

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}
      style={styles.modal}>
      <View style={styles.wrapModal}>
        <View style={styles.header}>
          <Header withClose />
        </View>
        <FlatList
          style={styles.wrapMenu}
          data={[
            {
              label: 'Home',
              onPress: handlePress(() => push('Home')),
            },
          ]}
          renderItem={rendermenuItem}
        />
      </View>
    </Modal>
  );
});

export default ModalHeader;

const styles = StyleSheet.create({
  modal: {margin: 0, justifyContent: 'flex-start', height: 100},
  wrapModal: {
    backgroundColor: colors.grey[50],
  },
  wrapMenuItemBorder: {
    borderTopWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  wrapMenuItem: {
    height: 24,
    marginBottom: 12,
  },
  textItem: {
    color: colors.neutral[700],
    fontSize: 16,
  },
  wrapMenu: {
    marginVertical: 28,
    marginHorizontal: 24,
  },
  header: {
    marginTop: 20,
  },
});
