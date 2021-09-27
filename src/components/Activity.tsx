import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeleteIcon, EditIcon } from '../shared/assetsManager';
import { fontFamily } from '../styles/generalStyles';




export const Activity = () => {
    return (
        <View style={ activityStyles.container } >
            <View style={{ flex: 1}}>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}> Activity </Text>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.bold }}> Activity Type: </Text>
                <Text style={{ ...activityStyles.textFormat, fontFamily: fontFamily.regular }}> Description of the activity</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                <EditIcon size={ 22 } />
                <DeleteIcon size={ 22 } />
            </View>
        </View>
    )
}

const activityStyles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 150,
        position: 'absolute',
        top: 25,
        right: 10,
        left: 10,
        padding: 2
    },
    textFormat: {
        color: 'white',
        fontSize: 14,
        marginVertical: -2
    }
});
