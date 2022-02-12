/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  NotFound: undefined
  Login: undefined
  Signup: undefined
  Drawer: NavigatorScreenParams<RootDrawerParamList> | undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootDrawerParamList = {
  Home: undefined
  PreviousWorks: undefined
  HelpCenter: undefined
  ChangePassword: undefined
}

export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
}
