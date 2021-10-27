import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Activity, ScreenView } from '../interfaces/appInterfaces';
import { DeleteIcon, EditIcon } from '../shared/assetsManager';
import { fontFamily } from '../styles/generalStyles';
import { getActivitySpecs } from '../helpers/helpersManager';



interface Props {
    activity: Activity;
    view: ScreenView
}

export const ActivityNote = ({ activity, view }: Props) => {

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
            backgroundColor: activity.projectName.color,
            width: view === 'D' ? '60%' : view === 'W' ? '80%' : '80%',
            zIndex: 999
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
        width: '65%',
        padding: 2,
        flex: 2,
        right: 0
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
