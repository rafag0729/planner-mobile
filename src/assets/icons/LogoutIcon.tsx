import Svg, { SvgProps, G, Path } from "react-native-svg";
import React from "react";




interface Props extends SvgProps{
    color?: string,
    size?: number;
}

export const LogoutIcon = ({ color = 'grey', size = 30 }: Props) => {
  return (
    <Svg id="SVGRoot" width={`${size}px`} height="28px" viewBox="0 0 28 28">
        <G transform="translate(.87728 .875)" stroke="#cbcbcb">
        <Path transform="translate(0 -.85)" d="m12.517 24.913h-9.388a1.07 1.07 0 0 1-1.043-1.094v-19.688a1.07 1.07 0 0 1 1.043-1.093h9.388a1.068 1.068 0 0 0 1.043-1.094 1.068 1.068 0 0 0-1.043-1.094h-9.388a3.212 3.212 0 0 0-3.129 3.281v19.688a3.212 3.212 0 0 0 3.129 3.281h9.388a1.095 1.095 0 0 0 0-2.187z" fill={ color } stroke={ color }/>
        <G transform="translate(9.477,5.823)">
        <Path transform="translate(-170.1 -107.16)" d="m186.56 113.72-6.342-6.259a1.043 1.043 0 0 0-1.464 1.485l4.532 4.473h-12.145a1.043 1.043 0 1 0 0 2.086h12.145l-4.532 4.473a1.043 1.043 0 1 0 1.464 1.485l6.342-6.259a1.043 1.043 0 0 0 0-1.485z" fill={ color } stroke={ color }/>
        </G>
        </G>
    </Svg>
  )
}