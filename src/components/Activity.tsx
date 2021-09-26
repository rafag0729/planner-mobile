import React from 'react';
import { Text, View } from 'react-native';




export const Activity = () => {
    return (
        <View 
            style={{ 
                backgroundColor: 'yellow',
                height: 150,
                borderRadius: 10,
                position: 'absolute',
                top: 25,
                right: 10,
                left: 10
            }}
            >
            <Text> Activity </Text>
            <Text> Activity Type: </Text>
            <Text> Description of the activity</Text>
        </View>
    )
}
