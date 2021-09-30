import React from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { TimeSelector, CustomSelector, Loading, CustomAlert } from './../shared/componentsManager';
import { useForm, useActivityPetition } from '../hooks/hooksManager';
import { ModalType } from '../interfaces/appInterfaces';
import { colors, fontFamily } from '../styles/generalStyles';




const { width } = Dimensions.get('screen')

interface Props {
    type: ModalType;
    visible: boolean;
    setShowModal: (value: boolean) => void;
}

export const CustomModal = ({ type, visible, setShowModal }: Props) => {

    const { modalPosition, respType, submitActivity } = useActivityPetition( setShowModal )
    const { formValues, projectName, activityType, description, startTime, endTime, setFormValues, settingHour, handleInputChange } = useForm({
        id: null,
        projectName: '',
        activityType: '',
        description: '',
        startTime: '--:-- am/pm',
        endTime: '--:-- am/pm',
        day: ''
    })
    
    return (
        <Modal
            animationType="slide"
            visible={ visible }
            onRequestClose={ () => setShowModal( false ) }
            > 
            
            {/* All modals screen container */}
            <Animated.View
                style={{ 
                    flexDirection: 'row', 
                    width: width * 3,
                    transform: [{
                        translateX: modalPosition
                    }]
                }}
                >
                   
                {/* ModalScreen to create and update´ */}
                <KeyboardAvoidingView
                    behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ ...styles.modalContainer, width }}
                    >
                    <ScrollView
                        showsVerticalScrollIndicator={ false }
                        >
                        <Text style={ styles.modalHeader }>
                            { type === 'creation' ? 'Crear actividad' : 'Editar actividad'}
                        </Text>

                        {/* Name of the activity */}
                        <Text style={ styles.modalText } >Nombre del proyecto<Text style={ styles.requiredIndicator }>*</Text></Text>
                        <CustomSelector
                            dataType='projects'
                            field="projectName"
                            getInputValue={ (value: string, field: 'projectName' | 'activityType' ) => handleInputChange( value, field ) }
                            textValue={ projectName }
                            />

                        {/* Type of the activity */}
                        <Text style={ styles.modalText } >Tipo de actividad<Text style={ styles.requiredIndicator }>*</Text></Text>
                        <CustomSelector 
                            dataType='projectTypes'
                            field="activityType"
                            getInputValue={ (value: string, field: 'projectName' | 'activityType' ) => handleInputChange( value, field ) }
                            textValue={ activityType }
                            />

                        {/* Description of the activity */}
                        <Text style={ styles.modalText } >¿Qué realizaste?</Text>
                        <TextInput 
                            style={[ styles.inputContainer, styles.textAreaContainer ]}
                            autoCorrect={ false }
                            multiline
                            numberOfLines={ 4 }
                            onChangeText={ (value: string) => handleInputChange( value, 'description')}
                            value={ description }
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

                            <View style={{ opacity: (!projectName || !activityType) ? .5 : 1 }}>
                                <TouchableOpacity
                                    style={ styles.modalButton }
                                    activeOpacity={ ( !projectName || !activityType ) ? 1 : .6 }
                                    onPress={ () => {
                                        /* if ( !projectName || !activityType ) return null; */

                                        submitActivity({ ...formValues })
                                    }}
                                    >
                                    <Text style={ styles.textButton } >Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <Loading />
                            
                <CustomAlert
                    type={ respType }
                    />
            </Animated.View >
        </Modal>
    )
}



const styles = StyleSheet.create({
    modalContainer: {
        paddingHorizontal: 20  
    },
    modalHeader: {
        fontFamily: fontFamily.bold,
        fontSize: 28,
        color: colors.lightBlue,
        textAlign: 'center',
        marginTop: 30

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