import Svg, { Circle, G, Path, Rect, SvgProps } from 'react-native-svg';
import React from 'react';




interface Props extends SvgProps{
    size?: number;
}

export const CalendarIcon = ({size = 46}: Props) => {
    return (
        <Svg id="SVGRoot" width={`${ size }px`} height={`${ size }px`} viewBox="0 0 46 46" >
            <G transform="matrix(.10045 0 0 .10045 -2.7143 -2.7143)" stroke="#05f" strokeWidth="20">
            <Rect x="48" y="80" width="416" height="384" rx="36.445" ry="38.933" fill="none" strokeLinejoin="round" strokeWidth="31.999"/>
            <G fill="#05f">
            <Circle cx="296" cy="232" r="24"/>
            <Circle cx="376" cy="232" r="24"/>
            <Circle cx="296" cy="312" r="24"/>
            <Circle cx="376" cy="312" r="24"/>
            <Circle cx="136" cy="312" r="24"/>
            <Circle cx="216" cy="312" r="24"/>
            <Circle cx="136" cy="392" r="24"/>
            <Circle cx="216" cy="392" r="24"/>
            <Circle cx="296" cy="392" r="24"/>
            </G>
            <Path d="m128 48v32m256-32v32" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <Path d="m464 160h-416" fill="none" strokeLinejoin="round" strokeWidth="32"/>
            </G>
        </Svg>
    )
}
