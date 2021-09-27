import Svg, { G, Line, Path, Rect, SvgProps } from 'react-native-svg';
import React from 'react';




interface Props extends SvgProps {
    size?: number
}

export const DeleteIcon = ({ size = 21}: Props) => {
    return (
        <Svg id="SvgRoot" width={ `${size}px` } height={ `${size}px` } viewBox="0 0 21 21" >
            <G transform="matrix(.625 0 0 .625 -373.1 -227.38)">
                <Rect x="597.76" y="364.61" width="32" height="32" rx="8.7575" ry="8.7575" fill="#fff"/>
                <G transform="matrix(.046875 0 0 .046875 601.89 368.86)" stroke="#000" strokeLinecap="round" strokeWidth="32px">
                    <Path d="m112 112 20 320c0.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" strokeLinejoin="round"/>
                    <Line x1="80" x2="432" y1="112" y2="112" strokeMiterlimit="10"/>
                    <G fill="none" strokeLinejoin="round">
                        <Path d="m192 112v-40a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24v40"/>
                        <Line x1="256" x2="256" y1="176" y2="400"/>
                        <Line x1="184" x2="192" y1="176" y2="400"/>
                        <Line x1="328" x2="320" y1="176" y2="400"/>
                    </G>
                </G>
            </G>
        </Svg>
    )
}
