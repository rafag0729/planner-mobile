import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AlertMsgInterface } from '../interfaces/appInterfaces';
import { unsetActivity } from '../reducer/appActions';
import { AppContext, ModalsContext } from '../contexts/contextsManager';
import { TimeSelector, CustomSelector, Loading, CustomAlert, AlertMessage } from './../shared/componentsManager';
import { useForm, useActivityPetition } from '../hooks/hooksManager';
import { hourErrorsValidation, singleHourValidation } from '../helpers/helpersManager';
import { colors, fontFamily } from '../styles/generalStyles';




const { width } = Dimensions.get('screen')

export const CustomModal = () => {

    const { dateTimeToModal, activitySelected, dispatcher } = useContext(AppContext)
    const { open, setIsOpen, setModalType, type } = useContext(ModalsContext)
    const { modalPosition, respType, submitActivity, deleteActivity } = useActivityPetition()
    const { formValues, setFormValues, resetForm, settingHour, handleInputChange } = useForm({
        id: '',
        projectName: '',
        activityType: '',
        description: '',
        day: dateTimeToModal.dateM,
        startTime: dateTimeToModal.startTimeM,
        endTime: '--:-- am/pm'
    })
    const [alert, setAlert] = useState<AlertMsgInterface>({
        message: '',
        type: null,
        open: false,
        setAlertMsg: () => {}
    })

    useEffect(() => {
        if(type === 'delete' && activitySelected){
            deleteActivity( activitySelected.id )
        }
    }, [type])

    useEffect(() => {
        if(formValues.startTime !== '--:-- am/pm'){
            const { valid, message } = singleHourValidation(formValues.startTime)
            if(!valid){
                setAlert({
                    ...alert,
                    message: message,
                    type: 'error',
                    open: true
                });
                setFormValues({...formValues, startTime: '--:-- am/pm'})
            }
        }
        if(formValues.endTime !== '--:-- am/pm'){
            const { valid, message } = singleHourValidation(formValues.endTime)
            if(!valid){
                setAlert({
                    ...alert,
                    message: message,
                    type: 'error',
                    open: true
                });
                setFormValues({...formValues, endTime: '--:-- am/pm'})
            }
        }
    }, [formValues.startTime, formValues.endTime])
    
    useEffect(() => {
        if(formValues.startTime !== '--:-- am/pm' && formValues.endTime !== '--:-- am/pm'){
            const { valid, message } = hourErrorsValidation(formValues.startTime, formValues.endTime)
            if(!valid){
                setAlert({
                    ...alert,
                    message: message,
                    type: 'error',
                    open: true
                });
                setFormValues({...formValues, endTime: '--:-- am/pm'})
            }
        }
    }, [formValues.startTime, formValues.endTime])

    useEffect(() => {
        if(activitySelected){
            setFormValues({
                ...formValues,
                id: activitySelected.id,
                description: activitySelected.description,
                day: activitySelected.day,
                startTime: activitySelected.startTime,
                endTime: activitySelected.endTime,
                projectName: activitySelected.projectName.id,
                activityType: activitySelected.activityType.id
            })
        } else {
            setFormValues({
                ...formValues,
                id: '',
                description: '',
                endTime: '',
                projectName: '',
                activityType: '',
                day: dateTimeToModal.dateM,
                startTime: dateTimeToModal.startTimeM
            })
        }
    }, [dateTimeToModal, activitySelected])


    const validatePetition = () => {
        if ( !formValues.projectName || !formValues.activityType || formValues.startTime === '--:-- am/pm' ||  formValues.endTime === '--:-- am/pm'){
            setAlert({
                ...alert,
                message: 'Por favor, primero llena los espacios requeridos para hacer la petición', 
                type: 'error',
                open: true,
            })
            return null;
        }
        submitActivity({ ...formValues })
        resetForm();
    }

    const cancelModals = () => {
        dispatcher( unsetActivity() )
        setModalType( null );
        setIsOpen( false );
    }
    
    return (
        <Modal
            animationType="slide"
            visible={ open }
            onRequestClose={ cancelModals }
            > 

            {   alert.open && (
                    <AlertMessage
                        type={ alert.type }
                        message={ alert.message }
                        setAlertMsg={(obj: AlertMsgInterface) => setAlert(obj) }
                        />
                )
            }
            
            
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
                            { type === 'create' ? 'Crear actividad' : 'Editar actividad'}
                        </Text>

                        {/* Name of the activity */}
                        <Text style={ styles.modalText } >Nombre del proyecto<Text style={ styles.requiredIndicator }>*</Text></Text>
                        <CustomSelector
                            dataType='projects'
                            field="projectName"
                            getInputValue={ (value: string, field: 'projectName' | 'activityType' ) => handleInputChange( value, field ) }
                            textValue={ formValues.projectName }
                            />

                        {/* Type of the activity */}
                        <Text style={ styles.modalText } >Tipo de actividad<Text style={ styles.requiredIndicator }>*</Text></Text>
                        <CustomSelector 
                            dataType='projectTypes'
                            field="activityType"
                            getInputValue={ (value: string, field: 'projectName' | 'activityType' ) => handleInputChange( value, field ) }
                            textValue={ formValues.activityType }
                            />

                        {/* Description of the activity */}
                        <Text style={ styles.modalText } >¿Qué realizaste?</Text>
                        <TextInput 
                            style={[ styles.inputContainer, styles.textAreaContainer ]}
                            autoCorrect={ false }
                            multiline
                            numberOfLines={ 4 }
                            onChangeText={ (value: string) => handleInputChange( value, 'description')}
                            value={ formValues.description }
                            />

                        {/* Time range of the activities */}
                        <Text style={ styles.modalText } >Desde - hasta</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <TimeSelector 
                                text={ formValues.startTime }
                                settingHour={ settingHour }
                                timerText='startTime'
                                />
                                
                            <TimeSelector 
                                text={ formValues.endTime }
                                settingHour={ settingHour }
                                timerText='endTime'
                                />
                        </View>
                    

                        {/* Modal's button actions */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, marginBottom: 40 }}>
                            <TouchableOpacity
                                style={ styles.modalButton }
                                onPress={ cancelModals }
                                >
                                <Text style={ styles.textButton } >Cancelar</Text>
                            </TouchableOpacity>

                            <View style={{ opacity: (!formValues.projectName || !formValues.activityType) ? .5 : 1 }}>
                                <TouchableOpacity
                                    style={ styles.modalButton }
                                    activeOpacity={ ( !formValues.projectName || !formValues.activityType ) ? 1 : .6 }
                                    onPress={ validatePetition }
                                    >
                                    <Text style={ styles.textButton } >Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <Loading type='Petition' />
                            
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