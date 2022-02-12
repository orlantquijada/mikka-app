import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import { ColorSchemeName, Text } from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootDrawerParamList, RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import LoginScreen from '../screens/LoginScreen'
import { userSelector, useUserStore } from '../stores/userStore'
import CustomDrawer from '../components/CustomDrawer'
import SignupScreen from '../screens/SignupScreen'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const user = useUserStore(userSelector)

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: 'Oops!' }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator<RootDrawerParamList>()
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={CustomDrawer}
      screenOptions={{ drawerType: 'front' }}
    >
      <Drawer.Screen name="Home" component={PlaceholderComponent} />
      <Drawer.Screen
        name="PreviousWorks"
        component={PlaceholderComponent}
        options={{ title: 'Previous Works' }}
      />
      <Drawer.Screen
        name="HelpCenter"
        component={PlaceholderComponent}
        options={{ title: 'Help Center' }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={PlaceholderComponent}
        options={{ title: 'Change Password' }}
      />
    </Drawer.Navigator>
  )
}

function PlaceholderComponent() {
  return <Text>placeholder</Text>
}
