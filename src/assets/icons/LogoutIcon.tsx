import React from "react"
import { View } from "react-native"
import Svg, { SvgProps, G, Path } from "react-native-svg"

interface Props extends SvgProps{
    color?: string,
    size?: number;
}

export const LogoutIcon = ({ color = 'grey', size = 30 }: Props) => {
  return (
        <Svg
            style={{
                width: size,
                height: size
            }}
            width="28.0px"
            height="28.0px"
            viewBox="0 0 28.0 28.0" >
            <G>
                <G transform="translate(0.87728153,0.875)" >
                <G>
                    <Path
                        d="M 12.517,24.913 H 3.129 A 1.07,1.07 0 0 1 2.086,23.819 V 4.131 A 1.07,1.07 0 0 1 3.129,3.038 h 9.388 A 1.068,1.068 0 0 0 13.56,1.944 1.068,1.068 0 0 0 12.517,0.85 H 3.129 A 3.212,3.212 0 0 0 0,4.131 V 23.819 A 3.212,3.212 0 0 0 3.129,27.1 h 9.388 a 1.095,1.095 0 0 0 0,-2.187 z"
                        transform="translate(0,-0.85)" 
                        fill={ color }
                        />
                </G>
                <G transform="translate(9.477,5.823)">
                    <Path
                        d="m 186.562,113.724 -6.342,-6.259 a 1.043,1.043 0 0 0 -1.464,1.485 l 4.532,4.473 h -12.145 a 1.043,1.043 0 1 0 0,2.086 h 12.145 l -4.532,4.473 a 1.043,1.043 0 1 0 1.464,1.485 l 6.342,-6.259 a 1.043,1.043 0 0 0 0,-1.485 z"
                        transform="translate(-170.1,-107.165)"
                        fill={ color }
                        />
                </G>
                </G>
            </G>
        </Svg>
  )
}