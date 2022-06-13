import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const BgTypes: React.FC<{fill?: string; width?: number}> = ({fill, width}) => {
  return (
    <Svg
      width={width}
      height={((width || Dimensions.get('window').width) * 601) / 360}
      viewBox="0 0 360 601"
      fill="none">
      <Path
        d="M359.917 35C304.182 35 259 78.5959 259 132.374C259 186.152 304.182 229.748 359.917 229.748"
        stroke={fill}
        strokeWidth="70"
        strokeLinecap="round"
      />
      <Path
        d="M-2.90871e-05 565.748C55.7347 565.748 100.917 522.152 100.917 468.374C100.917 414.596 55.7347 371 -2.90871e-05 371"
        stroke={fill}
        strokeWidth="70"
        strokeLinecap="round"
      />
    </Svg>
  );
};

BgTypes.defaultProps = {
  fill: '#0571A6',
  width: Dimensions.get('window').width,
};

export default BgTypes;
