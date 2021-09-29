import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { TimeSelector } from './../shared/componentsManager';
import { useForm } from '../hooks/hooksManager';
import { getAccuratePickerHour } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




interface Props {
    visible: boolean;
    setShowModal: ( value: boolean) => void;
}

export const CustomModal = ({ visible, setShowModal }: Props) => {

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
            visible={ visible }
            > 
            <KeyboardAvoidingView
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
                style={ styles.modalContainer }
                >
            {/* Container for the modal */}
                <ScrollView
                    showsVerticalScrollIndicator={ false }
                    >
                    <Text style={ styles.modalHeader }>Crear actividad</Text>

                    {/* Name of the activity */}
                    <Text style={ styles.modalText } >Nombre del proyecto<Text style={ styles.requiredIndicator }>*</Text></Text>
                    <TextInput 
                        style={ styles.inputContainer }
                        autoCorrect={ false }
                        onChangeText={ (value: string) => handleInputChange( value, 'activityName') }
                        value={ activityName }
                        />

                    {/* Type of the activity */}
                    <Text style={ styles.modalText } >Tipo de actividad<Text style={ styles.requiredIndicator }>*</Text></Text>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, marginBottom: 40 }}>
                        <TouchableOpacity
                            style={ styles.modalButton }
                            onPress={ () => setShowModal( false ) }
                            >
                            <Text style={ styles.textButton } >Cancelar</Text>
                        </TouchableOpacity>

                        <View style={{ opacity: (!activityName || !activityType) ? .5 : 1 }}>
                            <TouchableOpacity
                                style={ styles.modalButton }
                                activeOpacity={ ( !activityName || !activityType ) ? 1 : .6 }
                                onPress={ () => {
                                    if ( !activityName || !activityType ) return null;
                                    console.log('Llegue hasta aqui')
                                }}
                                >
                                <Text style={ styles.textButton } >Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    requiredIndicator: {
        color: colors.customRed,
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
        paddingVertical: 9,
    },
    textButton: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: 'white'
    }
});