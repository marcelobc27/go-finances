import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import AppRoutes from './src/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
