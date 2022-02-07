import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LogBox } from 'react-native'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

import 'react-native-gesture-handler'

LogBox.ignoreAllLogs()

const queryClient = new QueryClient()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    )
  }
}
