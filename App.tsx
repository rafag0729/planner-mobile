import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Navigator } from './src/shared/screensManager';



const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}

export default App;
