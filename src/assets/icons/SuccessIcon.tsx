import Svg, { G, Path } from 'react-native-svg';
import React from 'react';




interface Props {
    size?: number;
}

export const SuccessIcon = ({ size = 200 }: Props) => {
    return (
        <Svg id="SVGRoot" width={`${size}px`} height={`${size}px`} viewBox="0 0 201 201">
        <G transform="matrix(.48077 0 0 .48077 -22.577 -22.577)" fill="none" stroke="#29cc76" strokeWidth="32">
            <Path d="m448 256c0-106-86-192-192-192s-192 86-192 192 86 192 192 192 192-86 192-192z" strokeMiterlimit="10"/>
            <Path d="m352 176-134.4 160-57.6-64" strokeLinecap="round" strokeLinejoin="round"/>
        </G>
        </Svg>
    )
}
