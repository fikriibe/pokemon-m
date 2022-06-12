import React, {useMemo} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import colors from '../assets/themes/colors';
import {DefaultItem} from '../types/api';

const PillType: React.FC<ViewProps & {type: DefaultItem}> = ({type, style}) => {
  const backgroundColor = useMemo(() => {
    switch (type) {
      default:
        return colors.neutral[600];
    }
  }, [type]);
  return (
    <View style={[styles.wrap, style, {backgroundColor}]}>
      <Text style={styles.text}>{type.name}</Text>
    </View>
  );
};

export default PillType;

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
  },
});
