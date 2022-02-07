import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { Heading } from 'native-base'
import React from 'react'
import { useUserStore } from '../stores/userStore'

type Props = DrawerContentComponentProps

export default function CustomDrawer(props: Props) {
  const user = useUserStore.getState().user
  const setUser = useUserStore.getState().setUser

  return (
    <DrawerContentScrollView {...props}>
      <Heading
        size="sm"
        fontWeight="600"
        color="blue.400"
        marginX="3"
        marginBottom="8"
        marginTop="4"
      >
        {user?.username}
      </Heading>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => setUser(undefined)} />
    </DrawerContentScrollView>
  )
}
