import React from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {DefaultItem, TypePokemon} from '../types/api';
import {generateColorsType} from '../utils/generateColors';

const PillType: React.FC<ViewProps & {type: DefaultItem<TypePokemon>}> = ({
  type,
  style,
}) => {
  return (
    <View
      style={[
        styles.wrap,
        style,
        {backgroundColor: generateColorsType(type.name)},
      ]}>
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
