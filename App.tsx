import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppContextProvider } from './src/context/AppContext';

import { Header } from './src/shared/componentsManager';
import { Navigator } from './src/shared/screensManager';



const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Header />
        <Navigator />
      </NavigationContainer>
    </AppContextProvider>
  )
}

export default App;
