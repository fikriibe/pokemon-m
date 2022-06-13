import React, {
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {navigate, push} from '../../App';
import colors from '../../assets/themes/colors';
import {useToggle} from '../../hooks';
import {getType} from '../../store/selectors';
import Header from '../Header';

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
  item: {label, onPress, child},
  index,
}) => {
  const [visible, show, hide] = useToggle();

  const handleClick = useCallback(() => {
    if (child) {
      if (visible) {
        hide();
        return;
      }
      show();
      return;
    }
    onPress?.();
  }, [child, hide, onPress, show, visible]);

  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleClick}
        style={[styles.wrapMenuItem, index ? styles.wrapMenuItemBorder : null]}>
        <Text style={styles.textItem}>{label}</Text>
      </TouchableOpacity>
      {child && visible && (
        <FlatList
          style={styles.childMenu}
          data={child}
          renderItem={rendermenuItem}
        />
      )}
    </Fragment>
  );
};

const rendermenuItem = (props: any) => <MenuItem {...props} />;

const ModalHeader = forwardRef<ModalHeaderHandle, {}>((_, ref) => {
  const [visible, show, dismiss] = useToggle();
  const types = useSelector(getType);

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
  const dataMenu = useMemo(
    () => [
      {
        label: 'Home',
        onPress: handlePress(() => navigate('Home')),
      },
      {
        label: 'Pokemon Type',
        child: types.map(type => ({
          label: type.name,
          onPress: handlePress(() => push('Type', {data: type})),
        })),
      },
    ],
    [handlePress, types],
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
          data={dataMenu}
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
    maxHeight: '60%',
  },
  wrapMenuItemBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[300],
  },
  wrapMenuItem: {
    height: 36,
    paddingTop: 12,
    marginBottom: 12,
  },
  textItem: {
    color: colors.neutral[700],
    fontSize: 16,
    textTransform: 'capitalize',
  },
  wrapMenu: {
    marginVertical: 28,
    marginHorizontal: 24,
  },
  header: {
    marginTop: 20,
  },
  childMenu: {
    marginLeft: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[300],
  },
});
