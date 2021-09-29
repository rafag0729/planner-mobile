import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { TimeSelector } from './../shared/componentsManager';
import { useForm } from '../hooks/hooksManager';
import { getAccuratePickerHour } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




export const CustomModal = () => {

    const { activityName, activityType, activityDescription, startTime, endTime, handleInputChange } = useForm({
        activityName: '',
        activityType: '',
        activityDescription: '',
        activityDay: '',
        startTime: '--:-- am/pm',
        endTime: '--:-- am/pm'
    })

    const settingHour = ( time: Date | undefined, timerTitle: 'startTime' | 'endTime' ) => { 
        if(time){
            const { hour, minutes } = getAccuratePickerHour( time );
            
            handleInputChange(`${hour}:${minutes} ${hour < 13 ? 'am' : 'pm'}`, timerTitle );
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={ true }
            > 
            {/* Container for the modal */}
            <View style={ styles.modalContainer } >
                
                <Text style={ styles.modalHeader }>Crear actividad</Text>

                {/* Name of the activity */}
                <Text style={ styles.modalText } >Nombre del proyecto</Text>
                <TextInput 
                    style={ styles.inputContainer }
                    autoCorrect={ false }
                    onChangeText={ (value: string) => handleInputChange( value, 'activityName') }
                    value={ activityName }
                    />

                {/* Type of the activity */}
                <Text style={ styles.modalText } >Tipo de actividad</Text>
                <TextInput 
                    style={ styles.inputContainer }
                    autoCorrect={ false }
                    onChangeText={ (value: string) => handleInputChange( value, 'activityType')}
                    value={ activityType }
                    />

                {/* Description of the activity */}
                <Text style={ styles.modalText } >¿Qué realizaste?</Text>
                <TextInput 
                    style={[ styles.inputContainer, styles.textAreaContainer ]}
                    autoCorrect={ false }
                    multiline
                    numberOfLines={ 4 }
                    onChangeText={ (value: string) => handleInputChange( value, 'activityDescription')}
                    value={ activityDescription }
                    />

                {/* Time frame of the activities */}
                <Text style={ styles.modalText } >Desde - hasta</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TimeSelector 
                        text={ startTime }
                        settingHour={ settingHour }
                        timerText='startTime'
                        />
                        
                    <TimeSelector 
                        text={ endTime }
                        settingHour={ settingHour }
                        timerText='endTime'
                        />
                </View>
               

                {/* Modal's button actions */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                    <TouchableOpacity
                        style={ styles.modalButton }
                        >
                        <Text style={ styles.textButton } >Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ styles.modalButton }
                        >
                        <Text style={ styles.textButton } >Aceptar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20  
    },
    modalHeader: {
        fontFamily: fontFamily.bold,
        fontSize: 28,
        color: colors.lightBlue,
        textAlign: 'center'
    },
    modalText: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        marginTop: 20
    },
    inputContainer: {
        fontSize: 16,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 2,
        padding: 7,
        color: 'grey',
    },
    textAreaContainer: {
        height: 100,
        borderColor: colors.lightGrey,
        borderWidth: 2,
    },
    modalButton: {
        backgroundColor: colors.lightBlue,
        paddingHorizontal: 15,
        paddingVertical: 9
    },
    textButton: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: 'white'
    }
});