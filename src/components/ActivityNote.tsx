import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Activity } from '../interfaces/appInterfaces';
import { DeleteIcon, EditIcon } from '../shared/assetsManager';
import { fontFamily } from '../styles/generalStyles';
import { getActivitySpecs } from '../helpers/helpersManager';



interface Props {
    activity: Activity;
}

export const ActivityNote = ({ activity }: Props) => {

    const [position, setPosition] = useState<number>(0);
    const [length, setLength] = useState<number>(0);

    useEffect(() => {
        const [ position, length ] = getActivitySpecs( activity );
        setLength( length );
        setPosition( position );
    }, [])

    return (
        <View style={{ 
            ...activityStyles.container,
            top: 25 * position,
            height: length * 25
            }} >
            <View style={{ flex: 1}}>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}> { activity.projectName } </Text>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}> { activity.activityType }: </Text>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.regular }}> { activity.description } </Text>
            </View>
            <View style={ activityStyles.actionsPosition }>
                <EditIcon size={ 22 } />
                <DeleteIcon size={ 22 } />
            </View>
        </View>
    )
}

const activityStyles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 100,
        position: 'absolute',
        top: 25,
        right: 10,
        left: 10,
        padding: 3,
        zIndex: 999,
        elevation: 100
    },
    textFormat: {
        color: 'white',
        fontSize: 14,
        marginVertical: -2
    },
    actionsPosition: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 3,
        bottom: 1
    },
    
});
