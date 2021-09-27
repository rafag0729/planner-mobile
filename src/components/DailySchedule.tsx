import React from 'react';
import { ScrollView } from 'react-native';

import { militaryHours, hoursOfDay } from '../data/dateTimeData';
import { HourOfDay } from './../shared/componentsManager';




export const DailySchedule = () => {
    return (
        <ScrollView
            style={{ marginTop: 25 }}
            showsVerticalScrollIndicator={ false }
            >
            
            {/* Each hour block */}
            {   
                militaryHours.map((hour, i) => (
                    <HourOfDay 
                        hour={ hour }
                        hourOfDay={ hoursOfDay[i] }
                        key={ i.toString() }
                        />
                    ))  
            }

        </ScrollView>
    )
}

