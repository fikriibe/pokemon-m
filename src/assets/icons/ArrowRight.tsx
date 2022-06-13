import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {IconType} from '../../types/components';

const ArrowRight: React.FC<IconType> = ({fill, size}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <G clip-path="url(#clip0_76_272)">
        <Path
          d="M7.60211 3.09041L8.19669 2.49055C8.44844 2.23655 8.85554 2.23655 9.10462 2.49055L14.3112 7.7407C14.5629 7.99469 14.5629 8.40541 14.3112 8.6567L9.10462 13.9096C8.85286 14.1635 8.44576 14.1635 8.19669 13.9096L7.60211 13.3097C7.34767 13.053 7.35303 12.6342 7.61282 12.3829L10.8401 9.28088H3.14279C2.78658 9.28088 2.5 8.99176 2.5 8.63238V7.76772C2.5 7.40834 2.78658 7.11922 3.14279 7.11922H10.8401L7.61282 4.01722C7.35035 3.76593 7.34499 3.34711 7.60211 3.09041Z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_76_272">
          <Rect
            width="12"
            height="11.8"
            fill="white"
            transform="translate(2.5 2.30005)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

ArrowRight.defaultProps = {
  fill: '#42494D',
  size: 20,
};

export default ArrowRight;
