import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react';
import { DailyScreen, MonthlyScreen, WeeklyScreen } from '../shared/screensManager';
import { colors, fontFamily } from '../styles/generalStyles';




const Tab = createMaterialTopTabNavigator();

export const Navigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="DailyScreen"
        sceneContainerStyle={{ backgroundColor: 'white' }}
        tabBarPosition="bottom"
        screenOptions={{
            tabBarActiveTintColor: colors.darkBlue,
            tabBarLabelStyle: { fontFamily: fontFamily.bold, color: 'white' },
            tabBarStyle: { backgroundColor: colors.lightBlue },
            tabBarIndicatorStyle: { backgroundColor: colors.primaryBlue, height: '100%'},
        }}
        >
      <Tab.Screen name="MonthlyScreen" options={{ title: 'Mensual'}} component={ MonthlyScreen } />
      <Tab.Screen name="WeeklyScreen" options={{ title: 'Semanal' }} component={ WeeklyScreen } />
      <Tab.Screen name="DailyScreen" options={{ title: 'Diaria' }} component={ DailyScreen } />
    </Tab.Navigator>
  );
}