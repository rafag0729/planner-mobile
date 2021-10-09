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
            height: length * 25,
            backgroundColor: activity.projectName.color
            }} >
            <View style={{ flex: 1}}>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}>{ activity.projectName.name } </Text>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}>{ activity.activityType.name }: 
                    <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.regular }}> { activity.description } </Text>
                </Text>
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
        backgroundColor: 'grey',
        position: 'absolute',
        right: 5,
        left: 5,
        padding: 5,
        zIndex: 999,
        elevation: 999,
    },
    textFormat: {
        color: 'white',
        fontSize: 14,
        marginLeft: 5
    },
    actionsPosition: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 3,
        bottom: 1
    },
    
});
