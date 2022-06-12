import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../assets/themes/colors';

type Props = TouchableOpacityProps & {
  color: string;
};

const Button: React.FC<Props> = ({color, children, ...other}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...other}
      style={[styles.wrap, {backgroundColor: color || colors.neutral[500]}]}>
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
