import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconType} from '../../types/components';

const Bars: React.FC<IconType> = ({fill, size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.57143 5.57143H17.4286C17.7442 5.57143 18 5.31561 18 5V3.57143C18 3.25582 17.7442 3 17.4286 3H2.57143C2.25582 3 2 3.25582 2 3.57143V5C2 5.31561 2.25582 5.57143 2.57143 5.57143ZM2.57143 11.2857H17.4286C17.7442 11.2857 18 11.0299 18 10.7143V9.28571C18 8.97011 17.7442 8.71429 17.4286 8.71429H2.57143C2.25582 8.71429 2 8.97011 2 9.28571V10.7143C2 11.0299 2.25582 11.2857 2.57143 11.2857ZM2.57143 17H17.4286C17.7442 17 18 16.7442 18 16.4286V15C18 14.6844 17.7442 14.4286 17.4286 14.4286H2.57143C2.25582 14.4286 2 14.6844 2 15V16.4286C2 16.7442 2.25582 17 2.57143 17Z"
        fill={fill}
      />
    </Svg>
  );
};

Bars.defaultProps = {
  fill: '#B3B6B8',
  size: 20,
};

export default Bars;
