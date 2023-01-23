import { StatusBar } from 'react-native';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

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

import Signin from './src/screens/signin';
import { AuthProvider } from './src/hooks/auth';

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
        <StatusBar barStyle='light-content'/>
        <AuthProvider>
          <Signin/>
        {/* <AppRoutes/> */}
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
