import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Header } from './src/shared/componentsManager';
import { Navigator } from './src/shared/screensManager';



const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Navigator />
    </NavigationContainer>
  )
}

export default App;
