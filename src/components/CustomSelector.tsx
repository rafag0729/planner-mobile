import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ProjectInterface } from '../interfaces/appInterfaces';
import { colors } from '../styles/generalStyles';




interface Props {
    dataType: 'projects' | 'projectTypes';
    field: 'projectName' | 'activityType';
    getInputValue: (value: string, field: 'projectName' | 'activityType' ) => void;
    textValue: string;
}

export const CustomSelector = ({dataType, field, getInputValue, textValue }: Props) => {

    const [data, setData] = useState<ProjectInterface[]>([])
    
    useEffect(() => {
        gettingDocuments();
    }, [])

    const gettingDocuments = async() => {

        const dataList : ProjectInterface[] = []
        
        const projects = await firestore().collection(dataType).get();
        projects.docs.forEach((doc) => {
            const { name, color } = doc.data()
            dataList.push({
                id: doc.id,
                name,
                color
            })
        })

        setData( dataList );
    }


    return (
        <View
            style={ styles.inputContainer }
            >
            <Picker
                style={{ color: 'grey' }}
                selectedValue={ textValue }
                onValueChange={(itemValue) => getInputValue( itemValue, field ) }
                >
                    <Picker.Item label="Escoge una opción" value="" />
                    {
                        data.map( ({ id, name }: ProjectInterface) => (
                            <Picker.Item key={ id } label={ name } value={ id } />
                        ))
                    }
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        fontSize: 16,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 2,
        color: 'grey',
    },
    
});