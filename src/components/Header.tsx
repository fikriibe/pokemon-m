import React, {useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Bars from '../assets/icons/Bars';
import Close from '../assets/icons/Close';
import images from '../assets/images';
import colors from '../assets/themes/colors';
import {globalRef} from '../utils/globalRef';

const Header: React.FC<{withClose?: boolean}> = ({withClose}) => {
  const handlePress = useCallback(() => {
    if (withClose) {
      return globalRef.modalHeader?.dismiss();
    }
    globalRef.modalHeader?.show();
  }, [withClose]);

  return (
    <View style={styles.wrap}>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        {withClose ? <Close /> : <Bars />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grey[50],
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logo: {
    width: 69,
  },
});
