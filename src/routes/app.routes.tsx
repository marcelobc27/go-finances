import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons'

import Dashboard from '../screens/Dashboard'
import Register from '../screens/Register'
import Resume from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator()

const AppRoutes = () => {
  const theme = useTheme()

  return(
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: 10,
          height: 80
        }
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              name={'format-list-bulleted'}
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              name={'attach-money'}
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              name={'pie-chart'}
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  )
}

export default AppRoutes