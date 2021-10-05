import Svg, { G, Path, Polygon, Rect, SvgProps } from "react-native-svg";
import React, { useContext } from 'react';
import { TouchableOpacity } from "react-native";

import { ModalsContext } from '../../contexts/contextsManager';



interface Props extends SvgProps{
    size?: number
}

export const EditIcon = ({ size = 22 }: Props) => {

    const {setIsOpen, setModalType} = useContext(ModalsContext)

    const showEditModal = () => {
        setModalType('edit');
        setIsOpen(true);
    }

    return (
        <TouchableOpacity
            style={{ marginRight: 1}}
            onPress={ showEditModal }
            >
            <Svg id="SVGRoot" width={ `${size}px` } height={ `${size}px` } viewBox="0 0 21 21">
                <G transform="matrix(.625 0 0 .625 -339.91 -226.41)">
                <Rect x="544.65" y="363.06" width="32" height="32" rx="8.7575" ry="8.7575" fill="#fff"/>
                <G transform="matrix(.04809 0 0 .04809 549.16 367.32)" fill="black" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px">
                <Polygon points="64 448 108.99 425 386.75 147.87 364.13 125.25 87 403" strokeWidth="20px"/>
                <Path d="m420.69 68.69-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 0 0 0-22.62 16 16 0 0 0-22.62 0z"/>
                </G>
                </G>
            </Svg>
        </TouchableOpacity>
    )
}
