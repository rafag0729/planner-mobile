import React from 'react';
import Svg, { G, Line, Path, Polyline, SvgProps } from 'react-native-svg';




interface Props extends SvgProps {
    styles?: any;
    color?: string;
    size?: number;
    direction: 'rigth' | 'left'
}

export const NavigationArrow = ({ color, size = 36, direction }: Props) => {
    return (
        <Svg
            style={{
                transform: [
                    { rotateZ: direction === 'rigth' ? '180deg' : direction === 'left' ? '0deg' : '0deg'}
                ]
            }}
            width={`${ size }px`} height={`${ size }px`} viewBox="0 0 36 36">
            <G transform="matrix(.084135 0 0 .084135 -3.5385 -3.5385)" fill="none" stroke="#05f" strokeWidth="32px">
            <Polyline points="249.38 336 170 256 249.38 176" strokeLinecap="round" strokeLinejoin="round"/>
            <Line x1="181.03" x2="342" y1="256" y2="256" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="m448 256c0-106-86-192-192-192s-192 86-192 192 86 192 192 192 192-86 192-192z" strokeMiterlimit="10"/>
            </G>
        </Svg>
    )
}
